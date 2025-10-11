"use client";

import RecipeSearch from "../components/RecipeSearch/RecipeSearch";
import frenchManHat from "../public/french-chef-man.png";
import Image from 'next/image';

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <Image src={frenchManHat} alt="french man with moustache and chef hat" width={200} height ={100} />
      <h1>CookIt Recipes</h1>
      <RecipeSearch />
    </main>
  );
}
