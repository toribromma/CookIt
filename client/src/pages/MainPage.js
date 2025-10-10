import RecipeSearch from "../components/RecipeSearch/RecipeSearch";
import SavedRecipes from "../components/SavedRecipes/SavedRecipes";

export default function MainPage() {
  return (
    <div>
      <h1>Recipe App</h1>
      <RecipeSearch />
      <SavedRecipes />
    </div>
  );
}
