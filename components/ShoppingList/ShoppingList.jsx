"use client";

import { useMemo } from "react";
import { useApp } from "../providers/AppProvider";

export default function ShoppingList() {
  const { user, shoppingList, toggleItem, removeItem, removeRecipeFromShoppingList } = useApp();

  const aggregated = useMemo(() => {
    const map = new Map();
    shoppingList.forEach((item) => {
      const key = item.text;
      const current = map.get(key) || {
        text: item.text,
        ids: [],
        checked: [],
        recipes: new Map(),
      };
      current.ids.push(item.id);
      current.checked.push(item.checked);
      if (item.recipeId) {
        current.recipes.set(item.recipeId, item.recipeTitle || "Recipe");
      }
      map.set(key, current);
    });
    return Array.from(map.values()).map((entry) => ({
      text: entry.text,
      ids: entry.ids,
      allChecked: entry.checked.every(Boolean),
      count: entry.ids.length,
      recipeInfo: Array.from(entry.recipes.entries()).map(([id, title]) => ({ id, title })),
    }));
  }, [shoppingList]);

  const toggleGroup = (ids, nextState) => {
    ids.forEach((id) => toggleItem(id, nextState));
  };

  const removeGroup = (ids) => {
    ids.forEach((id) => removeItem(id));
  };

  if (!user) {
    return (
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Shopping list</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Sign in to track ingredients you need.
        </p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Shopping list</h2>
        <span className="text-xs pill">{shoppingList.length} item(s)</span>
      </div>
      {shoppingList.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Add ingredients from a recipe to see them here.
        </p>
      ) : (
        <ul className="space-y-2">
          {aggregated.map((entry) => (
            <li
              key={entry.text}
              className="flex items-start justify-between gap-3 p-3 border rounded-md"
              style={{ borderColor: "var(--border)" }}
            >
              <label className="flex items-center gap-2 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={entry.allChecked}
                  onChange={(e) => toggleGroup(entry.ids, e.target.checked)}
                />
                <div>
                  <p
                    className="text-sm flex items-center gap-2"
                    style={{
                      color: entry.allChecked ? "var(--muted)" : "var(--text)",
                      textDecoration: entry.allChecked ? "line-through" : "none",
                    }}
                  >
                    {entry.text}
                    {entry.count > 1 ? <span className="pill text-xs">{entry.count}x</span> : null}
                  </p>
                  {entry.recipeInfo.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {entry.recipeInfo.map((recipe) => (
                        <span
                          key={recipe.id}
                          className="text-[11px] px-2 py-1 rounded-full border"
                          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                        >
                          {recipe.title}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </label>
              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={() => removeGroup(entry.ids)}
                  className="text-xs"
                  style={{ color: "#b91c1c" }}
                >
                  remove
                </button>
                {entry.recipeInfo.length > 0 ? (
                  <div className="flex flex-col gap-1 items-end">
                    {entry.recipeInfo.map((recipe) => (
                      <button
                        key={recipe.id}
                        onClick={() => removeRecipeFromShoppingList(recipe.id)}
                        className="text-[11px]"
                        style={{ color: "#b91c1c" }}
                      >
                        remove "{recipe.title}"
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
