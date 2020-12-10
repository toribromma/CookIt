import axios from "axios";

export default {
  // Gets all books
  getRecipes: function(user) {
    return axios.get("/api/recipe", {
      params: {
        id: user}});
  },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipe", recipeData);
  },
  registerUser: function(userData) {
    return axios.post("/api/users/register", userData);
  },
  loginUser: function(userData) {
    return axios.post("/api/users/login", userData);
  },
  deleteRecipe: function(id) {
    return axios.delete("/api/recipe/" + id)
  },
  updateRecipeTitle: function(recipeData) {
    return axios.put("/api/recipe/", recipeData)
  }

};
