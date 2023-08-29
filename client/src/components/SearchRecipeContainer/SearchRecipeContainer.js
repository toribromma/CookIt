import React, { useState } from "react";
import Button from "../Button/Button.js";
import Input from "../Input/index.js";
import API from "../../utils/API.js";
import Recipes from "./Recipes.js";
import toast, { Toaster } from "react-hot-toast";

export default function SearchRecipeContainer() {
  const [search, setSearch] = useState({});
  const [recipes, setRecipes] = useState([]);
  const notifyGood = () => toast("Recipe search was successful");
  const notifyBad = () => toast("Recipe search was unsuccessful");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSearch({ [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (search.dish) {
      const dish = search.dish;

      try {
        const results = await API.searchRecipes(dish);
        setRecipes(results.data);
        notifyGood();
      } catch {
        notifyBad();
      }
    }
  }

  return (
    <div>
      <form>
        <Input
          header="Search for a Recipe"
          placeholder="Enter name of dish"
          name="dish"
          onChange={handleInputChange}
          margin="40px auto"
        />
        <Button
          disabled={!search.dish}
          onClick={handleFormSubmit}
          display="block"
          margin="40px auto"
        >
          <div>Click here to Search for Recipes</div>
        </Button>
      </form>
      {recipes && (
        <>
          <h1>Results</h1>
          <Recipes recipes={recipes} setRecipes={setRecipes} />
        </>
      )}
      <Toaster />
    </div>
  );
}
