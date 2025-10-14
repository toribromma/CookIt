"use client";

import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load previous results, history, and cache from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedResults = localStorage.getItem("searchResults");
      const savedHistory = localStorage.getItem("searchHistory");
      const cache = localStorage.getItem("searchCache");
      if (savedResults) setSearchResults(JSON.parse(savedResults));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (!cache) localStorage.setItem("searchCache", JSON.stringify({}));
    }
  }, []);

  // Save results and history to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("searchResults", JSON.stringify(searchResults));
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  }, [searchResults, history]);

  // Perform search with caching
  async function performSearch(searchQuery) {
    if (!searchQuery) return;
    if (typeof window === "undefined") return;

    const cache = JSON.parse(localStorage.getItem("searchCache") || "{}");

    if (cache[searchQuery]) {
      setSearchResults(cache[searchQuery]);
    } else {
      try {
        setLoading(true);
        const res = await fetch(`/api/recipes/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        const recipes = data.recipes || [];
        setSearchResults(recipes);

        // Update cache
        cache[searchQuery] = recipes;
        localStorage.setItem("searchCache", JSON.stringify(cache));
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }

    // Update history (most recent first, unique)
    setHistory((prev) => {
      const updated = [searchQuery, ...prev.filter((q) => q !== searchQuery)];
      return updated.slice(0, 10); // keep last 10 searches
    });
  }

  // Handle form submission
  function handleSearch(e) {
    e.preventDefault();
    performSearch(query);
    setQuery("");
  }

  // Clear displayed results
  function clearResults() {
    setSearchResults([]);
  }

  // Remove individual history item
  function removeHistoryItem(queryToRemove) {
    const updated = history.filter((q) => q !== queryToRemove);
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  }

  return (
    <div className="p-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes"
          className="border p-2 rounded flex-grow"
        />
        <button
          type="submit"
          className="bg-accentGold px-4 roundedtransition"
        >
          Search
        </button>
      </form>

      {/* Clear Displayed Results Button */}
      {searchResults.length > 0 && (
        <button
          onClick={clearResults}
          className="mb-4 text-sm text-red-500 hover:underline"
        >
          Clear Displayed Results
        </button>
      )}

      {/* Interactive Search History */}
      {history.length > 0 && (
        <div className="mb-4">
          <h3 className="font-script mb-2">Recent Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((q, i) => (
              <div
                key={i}
                className="flex items-center bg-cream border border-accentGold rounded-full px-3 py-1"
              >
                <button
                  onClick={() => performSearch(q)}
                  className="text-accentGold hover:text-white transition mr-2"
                >
                  {q}
                </button>
                <button
                  onClick={() => removeHistoryItem(q)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white p-4 rounded-lg shadow"
            >
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        // Search Results
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
