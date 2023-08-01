const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: false },
  thumbnail: {type: String, required: false},
  href: {type: String, required: false},
  ingredients: { type: Array, required: false },
  instructions: {type: Array, required: false},
  user: {type: String, required: false},
  cuisine: {type: String, required: false}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
