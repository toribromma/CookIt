import fetch from "node-fetch";

const HUGGINGFACE_API_KEY = process.env.HF_API_KEY;
const MODEL = "google/flan-t5-small";

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query parameter 'q'" });

  if (!HUGGINGFACE_API_KEY) {
    return res.status(500).json({ error: "HF_API_KEY environment variable not set" });
  }

  const prompt = `Create a detailed recipe for: ${q}. Include title, ingredients (as an array), and instructions (as an array).`;

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const text = await response.text(); // Get raw response

    if (!response.ok) {
      return res.status(500).json({ error: "Hugging Face API error", details: text });
    }

    let recipe = {};
    try {
      // Try parsing JSON
      recipe = JSON.parse(text);
    } catch {
      recipe = { title: q, ingredients: [], instructions: [], raw: text };
    }

    res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
