import React, { useEffect, useState } from "react";
import Input from "../Input/index.js";
import {checkJwtoken} from "../../utils/hooks";
import { load } from "dotenv";

const FilterRecipesContainer = ({ loadRecipes, setRecipes, recipes }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const filter = recipes.filter(recipe => {
      return recipe.title.toLowerCase().includes(search.toLowerCase());
    });
    setRecipes(filter);

    if(!search) {
      checkJwtoken(loadRecipes);
    }

  }, [search]);


  // const handleInputChange = (event) => {
  //   const { value } = event.target;
  //   if (value ) {
  //     const filteredArray = recipes.filter((recipe) => {
  //       const lc = recipe.title.toLowerCase();
  //       const filter = value.toString().toLowerCase();
  //       return lc.includes(filter);
  //     });
  //     setRecipes(filteredArray);
  //   } else {
  //     checkJwtoken(loadRecipes);
  //   }
  // };
  

  return (
    <Input
      header="Filter through Recipes"
      placeholder="Filter Recipes"
      name="filteredArray"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
};

export default FilterRecipesContainer;
