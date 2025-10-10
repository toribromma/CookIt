// /api/recipes/search.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const prompt = `
Generate 3 unique, creative recipes based on the query "${q}".
For each recipe include:
- title
- ingredients (list)
- instructions (list)
- cuisine type
Return JSON in this structure:
[
  {
    "title": "",
    "ingredients": [],
    "instructions": [],
    "cuisine": ""
  }
]
`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const data = await response.json();

    // Extract and parse JSON from model output
    let textOutput = data?.[0]?.generated_text || data?.generated_text || "";

    // Try to parse the JSON portion
    let recipes;
    try {
      const jsonStart = textOutput.indexOf("[");
      const jsonEnd = textOutput.lastIndexOf("]");
      recipes = JSON.parse(textOutput.slice(jsonStart, jsonEnd + 1));
    } catch (err) {
      recipes = [{ title: "Parsing error", details: textOutput }];
    }

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Hugging Face API error:", error);
    return res.status(500).json({ error: "Failed to generate recipes" });
  }
}
