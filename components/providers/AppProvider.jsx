"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import supabase from "../../src/lib/supabaseClient";

const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load session on mount and subscribe to auth changes
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) console.error("Supabase session error", error);
      setSession(data?.session || null);
      setUser(data?.session?.user || null);
      setHydrated(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      if (!newSession) {
        setSavedRecipes([]);
        setShoppingList([]);
      }
    });

    return () => {
      active = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Fetch user data when user changes
  useEffect(() => {
    if (!user?.id) return;
    fetchSaved();
    fetchShopping();
  }, [user?.id]);

  async function fetchSaved() {
    const { data, error } = await supabase
      .from("saved_recipes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Load saved recipes", error);
      return;
    }
    setSavedRecipes(
      (data || []).map((r) => ({
        id: r.recipe_id,
        title: r.title,
        mealType: r.meal_type,
        cuisine: r.cuisine,
        diet: r.diet,
        servings: r.servings,
        prep_time: r.prep_time,
        cook_time: r.cook_time,
        ingredients: r.ingredients || [],
        instructions: r.instructions || [],
      }))
    );
  }

  async function fetchShopping() {
    const { data, error } = await supabase
      .from("shopping_list_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Load shopping list", error);
      return;
    }
    setShoppingList(
      (data || []).map((item) => ({
        id: item.id,
        text: item.text,
        recipeId: item.recipe_id,
        recipeTitle: item.recipe_title,
        checked: item.checked,
      }))
    );
  }

  async function signIn(email, password) {
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  async function signUp(email, password) {
    setAuthError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function sendReset(email) {
    setAuthError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`,
    });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  async function saveRecipe(recipe) {
    if (!user?.id) return;
    const payload = {
      user_id: user.id,
      recipe_id: recipe.id,
      title: recipe.title,
      meal_type: recipe.mealType,
      cuisine: recipe.cuisine,
      diet: recipe.diet,
      servings: recipe.servings,
      prep_time: recipe.prep_time,
      cook_time: recipe.cook_time,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    };
    const { error } = await supabase
      .from("saved_recipes")
      .upsert(payload, { onConflict: "user_id,recipe_id" });
    if (error) {
      console.error("Save recipe error", error);
      return;
    }
    setSavedRecipes((prev) => {
      const filtered = prev.filter((r) => r.id !== recipe.id);
      return [recipe, ...filtered];
    });
  }

  async function removeSavedRecipe(id) {
    if (!user?.id) return;
    const { error } = await supabase
      .from("saved_recipes")
      .delete()
      .eq("user_id", user.id)
      .eq("recipe_id", id);
    if (error) {
      console.error("Delete saved recipe error", error);
      return;
    }
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  async function addIngredientsToList(recipe) {
    if (!user?.id || !Array.isArray(recipe.ingredients)) return;
    const rows = recipe.ingredients.map((text) => ({
      user_id: user.id,
      recipe_id: recipe.id,
      recipe_title: recipe.title,
      text,
      checked: false,
    }));
    const { error } = await supabase.from("shopping_list_items").insert(rows);
    if (error) {
      console.error("Add ingredients error", error);
      return;
    }
    fetchShopping();
  }

  async function toggleItem(id, nextState) {
    if (!user?.id) return;
    const { error } = await supabase
      .from("shopping_list_items")
      .update({ checked: nextState })
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) {
      console.error("Toggle item error", error);
      return;
    }
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: nextState } : item))
    );
  }

  async function removeItem(id) {
    if (!user?.id) return;
    const { error } = await supabase
      .from("shopping_list_items")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) {
      console.error("Delete item error", error);
      return;
    }
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  }

  async function removeRecipeFromShoppingList(recipeId) {
    if (!user?.id) return;
    const { error } = await supabase
      .from("shopping_list_items")
      .delete()
      .eq("user_id", user.id)
      .eq("recipe_id", recipeId);
    if (error) {
      console.error("Delete recipe items error", error);
      return;
    }
    setShoppingList((prev) => prev.filter((item) => item.recipeId !== recipeId));
  }

  const value = useMemo(
    () => ({
      hydrated,
      loading,
      setLoading,
      session,
      user,
      authError,
      signIn,
      signUp,
      signOut,
      sendReset,
      savedRecipes,
      saveRecipe,
      removeSavedRecipe,
      shoppingList,
      addIngredientsToList,
      toggleItem,
      removeItem,
      removeRecipeFromShoppingList,
    }),
    [
      hydrated,
      loading,
      session,
      user,
      authError,
      savedRecipes,
      shoppingList,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
