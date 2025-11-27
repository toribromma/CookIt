"use client";

import Image from "next/image";
import AuthPanel from "../components/AuthPanel";
import RecipeSearch from "../components/RecipeSearch/RecipeSearch";
import SavedRecipes from "../components/SavedRecipes/SavedRecipes";
import ShoppingList from "../components/ShoppingList/ShoppingList";
import frenchManHat from "../public/french-chef-man.png";

export default function Home() {
  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Image
          src={frenchManHat}
          alt="french man with moustache and chef hat"
          width={120}
          height={80}
        />
        <div>
          <h1 className="text-3xl font-semibold">CookIt Recipes</h1>
          <p className="text-gray-600 text-sm">
            Search deterministic recipes, tag them, save favorites, and build a shopping list.
          </p>
        </div>
      </div>

      <AuthPanel />
      <RecipeSearch />
      <SavedRecipes />
      <ShoppingList />
    </main>
  );
}
