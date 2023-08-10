import React, { useState } from "react";
import Button from "../Button/Button.js";
import Input from "../Input/index.js";
import API from "../../utils/API.js";
import Recipes from "./Recipes.js";
import toast, { Toaster } from "react-hot-toast";

export default function SearchRecipeContainer() {
  const [search, setSearch] = useState({});
  const [recipes, setRecipes] = useState([]);
  
  function handleInputChange(event) {
    const { name, value } = event.target;
    setSearch({ [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (search.dish) {
      console.log(search);
      const dish = search.dish;
      console.log(dish);
      const results = await API.searchRecipes(dish);
      console.log(results.data);
      setRecipes(results.data);
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
        />
        <Button
          disabled={!search.dish}
          onClick={handleFormSubmit}
          display="block"
          margin="5px auto"
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
    </div>
  );
  
}
