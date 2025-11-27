import fetch from "node-fetch";

const HF_TOKEN = process.env.HF_API_KEY;
const recipeCache = global.recipeCache || (global.recipeCache = new Map());

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Content-Type", "application/json");

  if (!HF_TOKEN) {
    return res.status(500).json({ error: "Missing HF_API_KEY on server" });
  }

  const { q: query, mealType = "", cuisine = "", diet = "" } = req.query;
  if (!query) return res.status(400).json({ error: "Missing query parameter" });

  const cacheKey = JSON.stringify({
    query: query.trim().toLowerCase(),
    mealType,
    cuisine,
    diet,
  });

  if (recipeCache.has(cacheKey)) {
    return res.status(200).json({ recipes: recipeCache.get(cacheKey) });
  }

  try {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "Qwen/Qwen3-4B-Instruct-2507:nscale",
        temperature: 0,
        top_p: 0.1,
        seed: 42,
        messages: [
          {
            role: "user",
            content: `
Generate exactly 5 recipes for "${query}" using the following guidance:
- Prefer the meal type "${mealType || "any"}" from [breakfast, lunch, dinner].
- Prefer the cuisine "${cuisine || "any"}" (e.g., Mexican, Italian, American, Mediterranean, Indian, Thai).
- Prefer the diet "${diet || "any"}" from [vegan, vegetarian, gluten-free, pescatarian, keto, omnivore].

Return a JSON array of 5 recipe objects with these fields:
- id (unique string)
- title
- mealType (one of breakfast, lunch, dinner)
- cuisine
- diet (vegan, vegetarian, gluten-free, pescatarian, keto, or omnivore)
- servings
- prep_time
- cook_time
- ingredients (array of short strings)
- instructions (array of concise step strings)

Always respond with valid JSON only and keep results deterministic for the same inputs.
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
    const recipeText = data?.choices?.[0]?.message?.content || "";

    let recipes = [];
    try {
      recipes = JSON.parse(recipeText);
    } catch (parseErr) {
      console.error("Failed to parse JSON from Hugging Face:", parseErr, recipeText);
      return res.status(500).json({ error: "Failed to parse recipes JSON", details: parseErr.message });
    }

    const normalized = Array.isArray(recipes)
      ? recipes.map((r, index) => ({
          id: r.id || `${query}-${index + 1}`,
          title: r.title || `Recipe ${index + 1}`,
          mealType: r.mealType || r.meal_type || mealType || "dinner",
          cuisine: r.cuisine || cuisine || "General",
          diet: r.diet || r.dietType || r.diet_type || diet || "omnivore",
          servings: r.servings || 2,
          prep_time: r.prep_time || r.prepTime || "15 mins",
          cook_time: r.cook_time || r.cookTime || "20 mins",
          ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
          instructions: Array.isArray(r.instructions) ? r.instructions : [],
        }))
      : [];

    recipeCache.set(cacheKey, normalized);

    res.status(200).json({ recipes: normalized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
