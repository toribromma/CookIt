// utils/API.js

const API = {
  // DB calls (saved recipes)
  getRecipes: () => fetch("/api/recipes").then(res => res.json()),
  saveRecipe: (recipe) =>
    fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    }),
  deleteRecipe: (id) =>
    fetch(`/api/recipes/${id}`, { method: "DELETE" }),

  // Spoonacular calls (external)
  searchRecipes: (query) =>
    fetch(`/api/external/recipes/search?query=${query}`).then(res => res.json()),
  getRecipe: (id) =>
    fetch(`/api/external/recipes/${id}`).then(res => res.json()),
};

export default API;
