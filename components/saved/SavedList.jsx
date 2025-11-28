"use client";

import { useState } from "react";
import { useApp } from "../providers/AppProvider";

export default function SavedList() {
  const {
    user,
    savedRecipes,
    removeSavedRecipe,
    addIngredientsToList,
    removeRecipeFromShoppingList,
  } = useApp();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (!user) {
    return (
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Saved recipes</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Sign in to keep recipes synced to your account.
        </p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Saved recipes</h2>
        <span className="text-xs pill">{savedRecipes.length} total</span>
      </div>
      {savedRecipes.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          No recipes saved yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {savedRecipes.map((r) => {
            const isExpanded = expandedId === r.id;
            return (
              <div key={r.id} className="border rounded-md p-3" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => toggleExpanded(r.id)}
                    className="text-left w-full"
                    style={{ color: "var(--text)" }}
                  >
                    <p className="font-semibold flex items-center justify-between gap-2">
                      <span>{r.title}</span>
                      <span className="text-xs pill">{isExpanded ? "Hide details" : "View details"}</span>
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {r.mealType} | {r.cuisine} | {r.diet}
                    </p>
                  </button>
                  <button
                    onClick={() => removeSavedRecipe(r.id)}
                    className="text-xs"
                    style={{ color: "#b91c1c" }}
                  >
                    remove
                  </button>
                </div>

                {isExpanded ? (
                  <div className="mt-3 space-y-3 border-t pt-3" style={{ borderColor: "var(--border)" }}>
                    <div className="text-xs flex gap-3 flex-wrap" style={{ color: "var(--muted)" }}>
                      <span>
                        {r.servings} serving{r.servings === 1 ? "" : "s"}
                      </span>
                      {r.prep_time ? <span>Prep: {r.prep_time}</span> : null}
                      {r.cook_time ? <span>Cook: {r.cook_time}</span> : null}
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Ingredients</p>
                      <ul className="list-disc ml-5 text-sm" style={{ color: "var(--text)" }}>
                        {(r.ingredients || []).map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Instructions</p>
                      <ol className="list-decimal ml-5 text-sm" style={{ color: "var(--text)" }}>
                        {(r.instructions || []).map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : null}

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => addIngredientsToList(r)}
                    className="text-xs px-3 py-1 rounded-md"
                    style={{ background: "var(--accent-2)", color: "#0b2b20" }}
                  >
                    Add ingredients to list
                  </button>
                  <button
                    onClick={() => removeRecipeFromShoppingList(r.id)}
                    className="text-xs px-3 py-1 rounded-md"
                    style={{ background: "rgba(185,28,28,0.1)", color: "#7f1d1d" }}
                  >
                    Remove dish from list
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
