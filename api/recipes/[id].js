import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id) return res.status(400).json({ error: "Missing recipe ID" });

  try {
    const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
}
