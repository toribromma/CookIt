// /api/recipes/[id].js
import dbConnect from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Fetch recipe error:", error);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
}
