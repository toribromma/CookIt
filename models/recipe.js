const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  thumbnail: {type: String, required: false},
  ingredients: { type: Array, required: true },
  instructions: {type: Array, required: true},
  summary: {type: String, required: false},
  date: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
