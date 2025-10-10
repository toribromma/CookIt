import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const HUGGINGFACE_API_KEY = process.env.HF_API_KEY;

  try {
    // Hugging Face Inference API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2", // or another recipe-capable model
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Generate a recipe for ${query} including title, ingredients (as list), and instructions (as list)`,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ error: "Hugging Face API error", details: errorText });
    }

    const data = await response.json();

    // Hugging Face text models return an array of objects with 'generated_text'
    const text = data[0]?.generated_text || "";

    // Optional: parse text into a structured recipe object
    // For simplicity, we return it as raw text; you can improve parsing later
    const recipe = { query, generated: text };

    return res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
