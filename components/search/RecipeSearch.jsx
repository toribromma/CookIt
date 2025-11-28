"use client";

import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useApp } from "../providers/AppProvider";

const MEALS = ["", "breakfast", "lunch", "dinner"];
const CUISINES = ["", "Mexican", "Italian", "American", "Mediterranean", "Indian", "Thai"];
const DIETS = ["", "vegan", "vegetarian", "gluten-free", "pescatarian", "keto", "omnivore"];

export default function RecipeSearch() {
  const { user, savedRecipes, saveRecipe, addIngredientsToList, setLoading, loading } = useApp();
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // reset errors when dependencies change
    setError("");
  }, [query, meal, cuisine, diet]);

  async function search(e) {
    e?.preventDefault();
    if (!query) return;
    setError("");
    setLoading(true);
    try {
      const params = new URLSearchParams({ q: query });
      if (meal) params.append("mealType", meal);
      if (cuisine) params.append("cuisine", cuisine);
      if (diet) params.append("diet", diet);

      const res = await fetch(`/api/recipes/search?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Search failed");
      }
      const data = await res.json();
      setResults(data.recipes || []);
      setQuery("");
    } catch (err) {
      setError(err?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  const isSaved = (id) => savedRecipes.some((r) => r.id === id);

  return (
    <section className="card">
      <div className="flex flex-col gap-3">
        <form onSubmit={search} className="flex flex-col gap-3">
          <div className="flex gap-2 flex-wrap">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes"
              className="border rounded-md px-3 py-2 flex-1 min-w-[220px]"
              style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--text)" }}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm"
              style={{ background: "var(--accent)", color: "#000" }}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <div className="flex gap-3 flex-wrap text-sm">
            <Select label="Meal" value={meal} onChange={setMeal} options={MEALS} />
            <Select label="Cuisine" value={cuisine} onChange={setCuisine} options={CUISINES} />
            <Select label="Diet" value={diet} onChange={setDiet} options={DIETS} />
          </div>
        </form>

        {error && (
          <p className="text-sm" style={{ color: "#b91c1c" }}>
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-100">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
            : results.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={isSaved(recipe.id)}
                  onSave={() =>
                    user ? saveRecipe(recipe) : setError("Please sign in to save recipes.")
                  }
                  onAdd={() =>
                    user ? addIngredientsToList(recipe) : setError("Please sign in to build your list.")
                  }
                />
              ))}
        </div>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-2 py-1 text-sm"
        style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--text)" }}
      >
        {options.map((opt) => (
          <option key={opt || "any"} value={opt}>
            {opt || "any"}
          </option>
        ))}
      </select>
    </label>
  );
}

function SkeletonCard() {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
          <div className="flex gap-2">
            <div className="skeleton h-4 w-16 rounded-full" />
            <div className="skeleton h-4 w-16 rounded-full" />
          </div>
        </div>
        <div className="skeleton h-6 w-12 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="skeleton h-3 w-2/3" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-8 w-24 rounded-md" />
        <div className="skeleton h-8 w-28 rounded-md" />
      </div>
    </div>
  );
}
