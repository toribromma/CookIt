import axios from "axios";

export default {
  // Gets all books
  getRecipes: function(query) {
    return axios.get("/api/recipes", {params: {q:query}});
  },
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id)
  },
  updateRecipeTitle: function(recipeData) {
    return axios.put("/api/recipes/" + recipeData.id, recipeData.title)
  },

};
