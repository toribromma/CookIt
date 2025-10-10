// /api/recipes/saved.js
import dbConnect from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

export default async function handler(req, res) {
  await dbConnect();

  try {
    switch (req.method) {
      case "GET":
        // Get all saved recipes
        const recipes = await Recipe.find({});
        return res.status(200).json(recipes);

      case "POST":
        // Save a new recipe
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        return res.status(201).json(newRecipe);

      case "DELETE":
        // Delete recipe by id
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "Recipe ID required" });

        const deleted = await Recipe.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Recipe not found" });

        return res.status(200).json({ message: "Recipe deleted" });

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Saved recipes error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
