import React, { useContext } from "react";
import Context from "../../utils/Context.js";
import Input from "../Input/index.js";
import jwt_decode from "jwt-decode";

const FilterRecipesContainer = ({ loadRecipes, userId }) => {
  const { value2 } = useContext(Context);
  const [recipes, setRecipes] = value2;

  const handleInputChange = (event) => {
      const {value} = event.target;
    if (value) {
      const filteredArray = recipes.filter((recipe) => {
        const lc = recipe.title.toLowerCase();
        const filter = value.toString().toLowerCase();
        return lc.includes(filter);
        // console.log(recipe)
      });
      setRecipes(filteredArray);
    } else if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      console.log("meh")
      loadRecipes(decoded.id);
    } else {
      console.log("blah")
      loadRecipes(userId);
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
