import { useContext } from "react";
import { RecipeContext } from "../../../../client/src/contexts/RecipeContext";
import { deleteRecipe } from "../../../../client/src/api/recipes";
import CalendarButton from "../CalendarButton/CalendarButton";

export default function SavedRecipes() {
  const { savedRecipes, setSavedRecipes } = useContext(RecipeContext);

  async function handleDelete(id) {
    await deleteRecipe(id);
    setSavedRecipes(savedRecipes.filter((r) => r.id !== id));
  }

  return (
    <div>
      <h2>Saved Recipes</h2>
      {savedRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h4>{recipe.title}</h4>
          <CalendarButton recipe={recipe} />
          <button onClick={() => handleDelete(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
