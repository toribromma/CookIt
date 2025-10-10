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
      setSearchResults(results); // could be object or array
    } catch (err) {
      console.log(err);
    }
  }

  // ✅ Make sure we always have an array to map over
  const recipesArray = Array.isArray(searchResults)
    ? searchResults
    : searchResults
    ? [searchResults]
    : [];

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
        {recipesArray.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
