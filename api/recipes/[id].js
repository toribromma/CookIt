import connectDB from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: "Failed to load recipe" });
  }
}
