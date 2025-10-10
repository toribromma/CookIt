import { useContext } from "react";
import { saveRecipe } from "../../api/recipes";
import { RecipeContext } from "../../contexts/RecipeContext";

export default function RecipeCard({ recipe }) {
  const { savedRecipes, setSavedRecipes } = useContext(RecipeContext);

  const isSaved = savedRecipes.some((r) => r.id === recipe.id);

  async function handleSave() {
    try {
      const saved = await saveRecipe(recipe);
      setSavedRecipes([...savedRecipes, saved]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} width="200" />
      {!isSaved && <button onClick={handleSave}>Save Recipe</button>}
    </div>
  );
}
