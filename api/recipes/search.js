import fetch from "node-fetch";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_KEY;

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) return res.status(400).json({ error: "Missing search query" });

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(q)}&number=10&apiKey=${SPOONACULAR_API_KEY}`
    );

    if (!response.ok) throw new Error("Spoonacular API request failed");

    const data = await response.json();
    res.status(200).json(data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
