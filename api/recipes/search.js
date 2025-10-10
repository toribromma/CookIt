// api/recipes/search.js
import fetch from "node-fetch";

const HF_TOKEN = process.env.HF_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query parameter" });

  try {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "Qwen/Qwen3-4B-Instruct-2507:nscale",
        messages: [
          {
            role: "user",
            content: `Create a detailed recipe for: ${query}. Include title, ingredients, instructions, and cuisine.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: "Hugging Face API error", details: text });
    }

    const data = await response.json();

    // Assuming the API returns text output in data.choices[0].message.content
    const recipeText = data?.choices?.[0]?.message?.content || "No recipe generated";

    // Optionally, you could parse recipeText into JSON with title, ingredients, etc.
    res.status(200).json({ recipe: recipeText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
