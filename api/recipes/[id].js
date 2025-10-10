import dbConnect from "@/lib/dbConnect";
import Recipe from "@/models/Recipe";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: "Failed to load recipe" });
  }
}
