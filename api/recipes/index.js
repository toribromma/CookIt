import connectDB from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

connectDB(); // Connect to MongoDB

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else if (req.method === 'POST') {
    try {
      const newRecipe = await Recipe.create(req.body);
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
