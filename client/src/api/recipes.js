const API_BASE = "/api/recipes";

// Search recipes via Spoonacular
export async function searchRecipes(query) {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search recipes");
  return res.json();
}

// Get recipe details
export async function getRecipeDetails(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to get recipe details");
  return res.json();
}

// Get all saved recipes
export async function getSavedRecipes() {
  const res = await fetch(`${API_BASE}/saved`);
  if (!res.ok) throw new Error("Failed to get saved recipes");
  return res.json();
}

// Save a recipe
export async function saveRecipe(recipe) {
  const res = await fetch(`${API_BASE}/saved`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error("Failed to save recipe");
  return res.json();
}

// Delete a recipe by ID
export async function deleteRecipe(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete recipe");
  return res.json();
}
