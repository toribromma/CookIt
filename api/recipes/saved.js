import connectDB from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const recipes = await Recipe.find({});
        res.status(200).json(recipes);
      } catch (err) {
        res.status(500).json({ error: "Failed to get saved recipes" });
      }
      break;

    case "POST":
      try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe);
      } catch (err) {
        res.status(500).json({ error: "Failed to save recipe" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ message: "Recipe deleted" });
      } catch (err) {
        res.status(500).json({ error: "Failed to delete recipe" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
