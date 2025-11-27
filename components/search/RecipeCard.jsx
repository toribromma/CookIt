"use client";

export default function RecipeCard({ recipe, isSaved, onSave, onAdd }) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
          <div className="flex gap-2 flex-wrap mt-1">
            <span className="pill text-xs">{recipe.mealType}</span>
            <span className="pill text-xs">{recipe.cuisine}</span>
            <span className="pill text-xs">{recipe.diet}</span>
          </div>
        </div>
        <span className="text-xs pill">
          {recipe.servings} serving{recipe.servings === 1 ? "" : "s"}
        </span>
      </div>
      <div className="text-sm" style={{ color: "var(--muted)" }}>
        <span className="mr-3">Prep: {recipe.prep_time}</span>
        <span>Cook: {recipe.cook_time}</span>
      </div>
      <div>
        <p className="font-semibold text-sm mb-1">Ingredients</p>
        <ul className="list-disc ml-5 text-sm" style={{ color: "var(--text)" }}>
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-sm mb-1">Instructions</p>
        <ol className="list-decimal ml-5 text-sm" style={{ color: "var(--text)" }}>
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onSave}
          className="text-sm px-3 py-2 rounded-md"
          style={{
            background: isSaved ? "rgba(16,185,129,0.15)" : "var(--accent)",
            color: isSaved ? "#065f46" : "#000",
          }}
        >
          {isSaved ? "Saved" : "Save recipe"}
        </button>
        <button
          onClick={onAdd}
          className="text-sm px-3 py-2 rounded-md"
          style={{ background: "var(--accent-2)", color: "#0b2b20" }}
        >
          Add ingredients to list
        </button>
      </div>
    </div>
  );
}
