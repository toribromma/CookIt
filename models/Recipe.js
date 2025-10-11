import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cuisine: { type: String },
  servings: { type: Number },
  prep_time: { type: String },
  cook_time: { type: String },
  ingredients: [String],
  instructions: [String],
  saved: { type: Boolean, default: false },
}, { timestamps: true });

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);

export default Recipe;
