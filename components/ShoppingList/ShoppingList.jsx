"use client";

import { useMemo } from "react";
import { useApp } from "../providers/AppProvider";

function parseIngredient(text) {
  const tokens = text.trim().split(/\s+/);
  let idx = 0;

  const isNumber = (t) => /^\d+(?:\.\d+)?$/.test(t);
  const isFraction = (t) => /^\d+\/\d+$/.test(t);
  const numberWithUnit = (t) => /^(\d+(?:\.\d+)?)([a-zA-Z]+)$/.exec(t);
  const fractionWithUnit = (t) => /^(\d+)\/(\d+)([a-zA-Z]+)$/.exec(t);

  const qtyTokens = [];
  let unit = null;

  while (idx < tokens.length) {
    const token = tokens[idx];
    if (isNumber(token) || isFraction(token)) {
      qtyTokens.push({ amount: token, unit: null });
      idx += 1;
      continue;
    }
    const numUnit = numberWithUnit(token);
    if (numUnit) {
      qtyTokens.push({ amount: numUnit[1], unit: numUnit[2] });
      unit = unit || numUnit[2];
      idx += 1;
      continue;
    }
    const fracUnit = fractionWithUnit(token);
    if (fracUnit) {
      const num = Number(fracUnit[1]);
      const den = Number(fracUnit[2]);
      qtyTokens.push({ amount: den ? num / den : 0, unit: fracUnit[3] });
      unit = unit || fracUnit[3];
      idx += 1;
      continue;
    }
    break;
  }

  const base = tokens.slice(idx).join(" ").trim();

  if (qtyTokens.length === 0) {
    return { amount: null, unit: null, base: base || text.trim() };
  }

  const amount = qtyTokens.reduce((sum, token) => {
    if (typeof token.amount === "number") return sum + token.amount;
    if (isFraction(token.amount)) {
      const [n, d] = token.amount.split("/").map((v) => Number(v));
      return sum + (d ? n / d : 0);
    }
    return sum + Number(token.amount);
  }, 0);

  return { amount, unit, base: base || text.trim() };
}

function formatAmount(amount) {
  if (!Number.isFinite(amount)) return "";
  const roundedInt = Math.round(amount);
  if (Math.abs(amount - roundedInt) < 1e-6) return String(roundedInt);

  const denominators = [2, 3, 4, 8];
  for (const d of denominators) {
    const n = Math.round(amount * d);
    if (Math.abs(amount - n / d) < 1e-3) {
      const whole = Math.floor(n / d);
      const remainder = n % d;
      if (whole === 0) return `${remainder}/${d}`;
      return `${whole} ${remainder}/${d}`;
    }
  }

  return amount.toFixed(2).replace(/\.00$/, "");
}

export default function ShoppingList() {
  const {
    user,
    shoppingList,
    toggleItem,
    removeItem,
    removeRecipeFromShoppingList,
    removeRecipeInstanceFromShoppingList,
  } = useApp();

  const aggregated = useMemo(() => {
    const map = new Map();
    shoppingList.forEach((item) => {
      const { amount, unit, base } = parseIngredient(item.text);
      const key = `${(base || item.text).toLowerCase()}|${unit || ""}`;

      const current = map.get(key) || {
        baseText: base || item.text,
        unit,
        ids: [],
        checked: [],
        totalAmount: 0,
        hasAmount: false,
        hasNonNumeric: false,
        recipes: new Map(),
      };

      current.ids.push(item.id);
      current.checked.push(item.checked);
      if (item.recipeTitle) {
        const key = `${item.recipeId || item.recipeTitle}|${item.recipeInstanceId || "instance"}`;
        const existing =
          current.recipes.get(key) || {
            title: item.recipeTitle,
            recipeId: item.recipeId,
            recipeInstanceId: item.recipeInstanceId,
            label: item.recipeInstanceLabel || item.recipeTitle,
            amount: 0,
          };
        existing.amount += amount || 0;
        current.recipes.set(key, existing);
      }
      if (amount != null) {
        current.totalAmount += amount;
        current.hasAmount = true;
      } else {
        current.hasNonNumeric = true;
      }
      map.set(key, current);
    });

    return Array.from(map.values()).map((entry) => ({
      ...entry,
      allChecked: entry.checked.every(Boolean),
    }));
  }, [shoppingList]);

  const recipesInList = useMemo(() => {
    const recipes = new Map();
    shoppingList.forEach((item) => {
      if (item.recipeId) {
        const key = `${item.recipeId}|${item.recipeInstanceId || "instance"}`;
        recipes.set(key, {
          recipeId: item.recipeId,
          recipeInstanceId: item.recipeInstanceId,
          title: item.recipeInstanceLabel || item.recipeTitle || "Recipe",
        });
      }
    });
    return Array.from(recipes.values());
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
      {recipesInList.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {recipesInList.map((recipe) => (
            <button
              key={`${recipe.recipeId}-${recipe.recipeInstanceId || "instance"}`}
              onClick={() =>
                recipe.recipeInstanceId
                  ? removeRecipeInstanceFromShoppingList(recipe.recipeId, recipe.recipeInstanceId)
                  : removeRecipeFromShoppingList(recipe.recipeId)
              }
              className="text-[11px] px-2 py-1 rounded-full border"
              style={{ borderColor: "var(--border)", color: "#b91c1c" }}
            >
              Remove "{recipe.title}"
            </button>
          ))}
        </div>
      ) : null}
      {shoppingList.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Add ingredients from a recipe to see them here.
        </p>
      ) : (
        <ul className="space-y-2">
          {aggregated.map((entry) => {
            const quantityLabel = entry.hasAmount
              ? `${formatAmount(entry.totalAmount)}${entry.unit ? entry.unit : ""} ${entry.baseText}`
              : entry.baseText;

            return (
              <li
                key={entry.baseText}
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
                      {quantityLabel}
                      {entry.hasAmount && entry.hasNonNumeric ? (
                        <span className="pill text-[11px]" style={{ background: "rgba(251, 191, 36, 0.2)", color: "#854d0e" }}>
                          + text-only
                        </span>
                      ) : null}
                    </p>
                    {entry.recipes.size > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Array.from(entry.recipes.entries()).map(([key, data]) => (
                          <span
                            key={key}
                            className="text-[11px] px-2 py-1 rounded-full border"
                            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                          >
                            {data.label}
                            {entry.hasAmount ? ` (${formatAmount(data.amount)}${entry.unit || ""})` : ""}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </label>
                <button
                  onClick={() => removeGroup(entry.ids)}
                  className="text-xs"
                  style={{ color: "#b91c1c" }}
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
