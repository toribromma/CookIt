import fetch from "node-fetch";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_KEY;

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query" });

  try {
    // Step 1: search
    const searchResponse = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(q)}&number=10&apiKey=${SPOONACULAR_API_KEY}`
    );
    if (!searchResponse.ok) throw new Error("Search failed");
    const searchData = await searchResponse.json();

    // Step 2: get detailed info for each recipe
    const detailedRecipes = await Promise.all(
      searchData.results.map(async (recipe) => {
        const detailsRes = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${SPOONACULAR_API_KEY}`
        );
        const details = await detailsRes.json();

        return {
          title: details.title,
          thumbnail: details.image,
          href: details.sourceUrl,
          ingredients: details.extendedIngredients?.map(i => i.original) || [],
          instructions: details.analyzedInstructions?.[0]?.steps?.map(s => s.step) || [],
          cuisine: details.cuisines?.[0] || "Unknown",
        };
      })
    );

    res.status(200).json(detailedRecipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
