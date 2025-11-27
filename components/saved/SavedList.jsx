"use client";

import { useApp } from "../providers/AppProvider";

export default function SavedList() {
  const { user, savedRecipes, removeSavedRecipe, addIngredientsToList } = useApp();

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
          {savedRecipes.map((r) => (
            <div key={r.id} className="border rounded-md p-3" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {r.mealType} • {r.cuisine} • {r.diet}
                  </p>
                </div>
                <button
                  onClick={() => removeSavedRecipe(r.id)}
                  className="text-xs"
                  style={{ color: "#b91c1c" }}
                >
                  remove
                </button>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <button
                  onClick={() => addIngredientsToList(r)}
                  className="text-xs px-3 py-1 rounded-md"
                  style={{ background: "var(--accent-2)", color: "#0b2b20" }}
                >
                  Add ingredients to list
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
