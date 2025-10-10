import { useState, useContext } from "react";
import { searchRecipes } from "../../api/recipes";
import { RecipeContext } from "../../contexts/RecipeContext";
import RecipeCard from "./RecipeCard";

export default function RecipeSearch() {
  const [query, setQuery] = useState("");
  const { searchResults, setSearchResults } = useContext(RecipeContext);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query) return;

    try {
      const results = await searchRecipes(query);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
