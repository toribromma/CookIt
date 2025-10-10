// api/recipes/search.js
import fetch from "node-fetch";

const HUGGINGFACE_API_KEY = process.env.HF_API_KEY; // Add this in Vercel Environment Variables
const MODEL = "google/flan-t5-small"; // Example text generation model

export default async function handler(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query parameter 'q'" });

    // Prompt for the LLM
    const prompt = `Create a detailed recipe for: ${q}. Include title, ingredients (as an array), and instructions (as an array).`;

    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: "Hugging Face API error", details: text });
    }

    const data = await response.json();

    // Hugging Face returns an array with generated text
    const generatedText = data?.[0]?.generated_text || "";

    // Attempt to parse JSON from the LLM output
    let recipe = {};
    try {
      recipe = JSON.parse(generatedText);
    } catch {
      recipe = { title: q, ingredients: [], instructions: [], raw: generatedText };
    }

    res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
