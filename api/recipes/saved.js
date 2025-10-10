import connectDB from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

connectDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
    } catch (err) {
      res.status(500).json({ error: "Failed to get saved recipes" });
    }
  } else if (req.method === "POST") {
    try {
      const newRecipe = await Recipe.create(req.body);
      res.status(201).json(newRecipe);
    } catch (err) {
      res.status(500).json({ error: "Failed to save recipe" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
