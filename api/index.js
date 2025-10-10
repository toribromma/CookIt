import connectDB from "../../config/db.js";
import Recipe from "../../models/Recipe.js";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const recipes = await Recipe.find({});
        res.status(200).json(recipes);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;

    case "POST":
      try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json(recipe);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
