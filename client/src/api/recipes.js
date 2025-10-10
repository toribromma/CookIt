const API_BASE = "/api/recipes";

export async function searchRecipes(query) {
  console.log(query);
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  console.log(res);
  if (!res.ok) throw new Error("Failed to search recipes");
  return res.json();
}

export async function getSavedRecipes() {
  const res = await fetch(`${API_BASE}/saved`);
  if (!res.ok) throw new Error("Failed to fetch saved recipes");
  return res.json();
}

export async function saveRecipe(recipe) {
  const res = await fetch(`${API_BASE}/saved`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error("Failed to save recipe");
  return res.json();
}

export async function deleteRecipe(id) {
  const res = await fetch(`${API_BASE}/saved?id=${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete recipe");
  return res.json();
}
