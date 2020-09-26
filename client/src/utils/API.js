import axios from "axios";

export default {
  // Gets all books
  getRecipes: function() {
    return axios.get("/api/recipe");
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
  }
};
