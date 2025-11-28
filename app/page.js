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
      <header className="flex flex-col items-center text-center gap-3">
        <Image
          src={frenchManHat}
          alt="Chef illustration"
          width={180}
          height={124}
          className="rounded-full border"
          style={{ borderColor: "var(--border)" }}
        />
        <div>
          <h1 className="text-3xl font-semibold">Meal Muse</h1>
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
