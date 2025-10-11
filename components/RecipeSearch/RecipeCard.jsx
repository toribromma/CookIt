export default function RecipeCard({ recipe }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
      <h2>{recipe.title}</h2>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Prep Time:</strong> {recipe.prep_time}</p>
      <p><strong>Cook Time:</strong> {recipe.cook_time}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
