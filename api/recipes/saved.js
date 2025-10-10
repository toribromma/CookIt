import dbConnect from "../../../config/db.js";
import Recipe from "../../../models/Recipe.js";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const recipes = await Recipe.find({});
        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes" });
      }
      break;

    case "POST":
      try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json(recipe);
      } catch (error) {
        res.status(400).json({ error: "Failed to save recipe" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        await Recipe.findByIdAndDelete(id);
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: "Failed to delete recipe" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
