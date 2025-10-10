import connectDB from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

connectDB();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) return res.status(404).json({ error: "Recipe not found" });
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ error: "Failed to get recipe" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleted = await Recipe.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: "Recipe not found" });
      res.status(200).json({ message: "Recipe deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete recipe" });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
