import connectDB from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

connectDB();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) return res.status(404).json({ message: "Recipe not found" });
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
      res.status(200).json(updatedRecipe);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found" });
      res.status(200).json(deletedRecipe);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
