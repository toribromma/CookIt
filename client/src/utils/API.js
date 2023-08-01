import axios from "axios";

export default {
  // Gets all Recipes
  getRecipes: function (query, ) {
    return axios.get("/api/recipes", { params: { q: query } });
  },
  getRecipe: function (id) {
    return axios.get("/api/recipes/" + id);
  },
  saveRecipe: function (recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  deleteRecipe: function (id) {
    return axios.delete("/api/recipes/" + id);
  },
  updateRecipeTitle: function (recipeData) {
    return axios.put("/api/recipes/" + recipeData.id, {
      params: {
        q: recipeData.title,
        r: recipeData.ingredients,
        s: recipeData.instructions,
        t: recipeData.cuisine,
      },
    });
  },
  searchRecipes: function (id) {
    return axios.get("/api/recipes/search/" + id );
  },
  getNewRecipe: function(id) {
    return axios.get("/api/recipes/new/search/" + id);
  },
  saveNewRecipe:function(recipeData) {
    return axios.post("/api/recipes/new", recipeData)
  }
};
