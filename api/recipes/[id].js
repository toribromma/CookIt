import dbConnect from "../../../config/db.js";
import Recipe from "../../../models/Recipe.js";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: "Invalid recipe ID" });
  }
}
