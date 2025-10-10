import fetch from "node-fetch";

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `Generate a recipe for ${q} including title, ingredients, and instructions.`,
        parameters: { max_new_tokens: 250 }
      })
    });

    const data = await response.json();

    if (!Array.isArray(data) || !data[0]?.generated_text) {
      return res.status(500).json({ error: "Invalid Hugging Face response", data });
    }

    // For simplicity, parse out text
    const text = data[0].generated_text;

    res.status(200).json({
      title: q,
      ingredients: ["Ingredient 1", "Ingredient 2"], // placeholder
      instructions: [text],
      thumbnail: "",
      href: "",
      cuisine: "Generated"
    });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
}
