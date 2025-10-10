import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: false },
  thumbnail: { type: String, required: false },
  href: { type: String, required: false },
  ingredients: { type: [String], required: false },
  instructions: { type: [String], required: false },
  user: { type: String, required: false },
  cuisine: { type: String, required: false },
});

// Reuse model if it exists (important for serverless)
const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
