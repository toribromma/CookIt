import { createContext, useState, useEffect } from "react";
import { getSavedRecipes } from "../api/recipes";

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    async function fetchSaved() {
      try {
        const recipes = await getSavedRecipes();
        setSavedRecipes(recipes);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSaved();
  }, []);

  return (
    <RecipeContext.Provider
      value={{ searchResults, setSearchResults, savedRecipes, setSavedRecipes }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
