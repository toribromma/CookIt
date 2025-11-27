"use client";

import Image from "next/image";
import AuthPanel from "../components/auth/AuthPanel";
import RecipeSearch from "../components/search/RecipeSearch";
import SavedList from "../components/saved/SavedList";
import ShoppingList from "../components/ShoppingList/ShoppingList";
import frenchManHat from "../public/french-chef-man.png";

export default function Home() {
  return (
    <main className="page-shell space-y-6">
      <header className="flex items-center gap-4 flex-wrap">
        <Image src={frenchManHat} alt="Chef illustration" width={120} height={80} />
        <div>
          <h1 className="text-3xl font-semibold">CookIt Recipes</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Search deterministic recipes, save your favorites, and build a shopping list with Supabase auth.
          </p>
        </div>
      </header>

      <AuthPanel />
      <RecipeSearch />
      <SavedList />
      <ShoppingList />
    </main>
  );
}
