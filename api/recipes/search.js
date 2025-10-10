import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  try {
    const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(q)}&number=10&apiKey=${SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data.results || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
}
