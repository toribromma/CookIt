import https from "https";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const HF_TOKEN = process.env.HF_API_KEY;
const cache = global.recipeCache ?? new Map();
global.recipeCache = cache;

const agent =
  process.env.ALLOW_INSECURE_HTTPS === "1"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q");
  const mealType = url.searchParams.get("mealType") || "";
  const cuisine = url.searchParams.get("cuisine") || "";
  const diet = url.searchParams.get("diet") || "";

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }
  if (!HF_TOKEN) {
    return NextResponse.json({ error: "Missing HF_API_KEY on server" }, { status: 500 });
  }

  const key = JSON.stringify({ query: query.trim().toLowerCase(), mealType, cuisine, diet });
  if (cache.has(key)) {
    return NextResponse.json({ recipes: cache.get(key) });
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
Generate exactly 5 recipes for "${query}" with:
- mealType (pick from breakfast, lunch, dinner; prefer "${mealType || "any"}")
- cuisine (prefer "${cuisine || "any"}")
- diet (prefer "${diet || "any"}" from vegan, vegetarian, gluten-free, pescatarian, keto, omnivore)

Return a JSON array of 5 objects with:
- id (unique string)
- title
- mealType
- cuisine
- diet
- servings
- prep_time
- cook_time
- ingredients (array of short strings)
- instructions (array of concise steps)

Respond with JSON only, deterministic for the same inputs.
            `,
          },
        ],
      }),
      agent,
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: "Hugging Face API error", details: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    const recipeText = data?.choices?.[0]?.message?.content || "";

    let recipes = [];
    try {
      recipes = JSON.parse(recipeText);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to parse recipes JSON", details: err.message },
        { status: 500 }
      );
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

    cache.set(key, normalized);
    return NextResponse.json({ recipes: normalized });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
