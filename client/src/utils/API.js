const API_URL = "/api/recipes";

export default {
  getRecipes: async (query) => {
    const res = await fetch(`${API_URL}?q=${encodeURIComponent(query || "")}`);
    return res.json();
  },

  getRecipe: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  },

  saveRecipe: async (recipeData) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    return res.json();
  },

  deleteRecipe: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return res.json();
  },

  updateRecipeTitle: async (recipeData) => {
    const res = await fetch(`${API_URL}/${recipeData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: recipeData.title,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        cuisine: recipeData.cuisine,
      }),
    });
    return res.json();
  },

  searchRecipes: async (id) => {
    const res = await fetch(`${API_URL}/search/${id}`);
    return res.json();
  },

  getNewRecipe: async (id) => {
    const res = await fetch(`${API_URL}/new/search/${id}`);
    return res.json();
  },

  saveNewRecipe: async (recipeData) => {
    const res = await fetch(`${API_URL}/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    return res.json();
  },
};
