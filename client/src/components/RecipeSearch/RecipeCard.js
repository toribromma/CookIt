import React from "react";

export default function RecipeCard({ recipe }) {
  return (
    <div
      className="recipe-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#fafafa",
      }}
    >
      <h2>{recipe.title}</h2>
      <p>
        <strong>Cuisine:</strong> {recipe.cuisine} | <strong>Servings:</strong>{" "}
        {recipe.servings}
      </p>
      <p>
        <strong>Prep Time:</strong> {recipe.prep_time} | <strong>Cook Time:</strong>{" "}
        {recipe.cook_time}
      </p>

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {recipe.instructions && recipe.instructions.length > 0 && (
        <>
          <h3>Instructions:</h3>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
