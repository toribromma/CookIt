import fetch from "node-fetch";

const HF_TOKEN = process.env.HF_API_KEY;

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
            content: `
              Create 3 distinct recipes for: ${query}.
              Return them as a JSON array of 3 objects.
              Each object must have these fields:
              - id (unique string)
              - title
              - cuisine
              - servings
              - prep_time
              - cook_time
              - ingredients (array of strings)
              - instructions (array of strings)
              Only return valid JSON, no extra text.
            `,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: "Hugging Face API error", details: text });
    }

    const data = await response.json();

    // Get raw text from HF
    const recipeText = data?.choices?.[0]?.message?.content || "";

    let recipes = [];
    try {
      recipes = JSON.parse(recipeText);
    } catch (parseErr) {
      console.error("Failed to parse JSON from Hugging Face:", parseErr, recipeText);
      return res.status(500).json({ error: "Failed to parse recipes JSON", details: parseErr.message });
    }

    res.status(200).json({ recipes }); // Always return an array of 3 recipe objects
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
