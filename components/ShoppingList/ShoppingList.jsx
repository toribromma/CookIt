"use client";

import { useApp } from "../providers/AppProvider";

export default function ShoppingList() {
  const { user, shoppingList, toggleItem, removeItem } = useApp();

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
          {shoppingList.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-3 p-2 border rounded-md"
              style={{ borderColor: "var(--border)" }}
            >
              <label className="flex items-center gap-2 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => toggleItem(item.id, e.target.checked)}
                />
                <div>
                  <p
                    className="text-sm"
                    style={{
                      color: item.checked ? "var(--muted)" : "var(--text)",
                      textDecoration: item.checked ? "line-through" : "none",
                    }}
                  >
                    {item.text}
                  </p>
                  {item.recipeTitle && (
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      From: {item.recipeTitle}
                    </p>
                  )}
                </div>
              </label>
              <button
                onClick={() => removeItem(item.id)}
                className="text-xs"
                style={{ color: "#b91c1c" }}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
