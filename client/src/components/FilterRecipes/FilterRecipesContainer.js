import React, { useContext } from "react";
import Context from "../../utils/Context.js";
import Input from "../Input/index.js";

const FilterRecipesContainer = ({ loadRecipes }) => {
  const { value2 } = useContext(Context);
  const [recipes, setRecipes] = value2;

  const handleInputChange = (event) => {
    if (event.target.value !== "") {
      const filteredArray = recipes.filter((recipe) => {
        const lc = recipe.title.toLowerCase();
        const filter = event.target.value.toString().toLowerCase();
        return lc.includes(filter);
        // console.log(recipe)
      });
      setRecipes(filteredArray);
    } else {
      loadRecipes();
    }
  };

  return (
    <Input
      header="Filter through Recipes"
      placeholder="Filter Recipes"
      name="filteredArray"
      onChange={handleInputChange}
    />
  );
};

export default FilterRecipesContainer;
