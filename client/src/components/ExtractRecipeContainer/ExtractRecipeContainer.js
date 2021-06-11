import React, { useState } from "react";
import Button from "../Button/Button";
import Error from "../Error/index";
import Input from "../Input/index";
import API from "../../utils/API";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {checkJwtoken} from "../../utils/hooks"

export default function ExtractRecipeContainer({
  loadRecipes
}) {
  const [formObject, setFormObject] = useState({});
  const [error, setError] = useState();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    const decoded = jwt_decode(localStorage.jwtToken);

    event.preventDefault();

    setError("Loading...");

    if (formObject.url) {
      axios
        .get(
          `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${formObject.url}`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-RapidApi-Host":
                "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              "X-RapidApi-Key": process.env.REACT_APP_API_KEY,
            },
          }
        )
        .then(async (response) => {
          console.log(response.data);

          const {
            sourceUrl,
            title,
            image,
            analyzedInstructions: [
              {
                steps: [...steps],
              },
            ],
            extendedIngredients: [...ingredients],
          } = response.data;

          let instructions = steps.map((i) => i.step);
          let ingredientsArray = ingredients.map((i) => i.original);

          API.saveRecipe({
            title: title,
            thumbnail: image,
            href: sourceUrl,
            instructions: instructions,
            ingredients: ingredientsArray,
            user: decoded.id,
          })
            .then(() => checkJwtoken(loadRecipes))
            .then(() => setError(""));
        })
        .catch((err) => {
          console.log(err);
          setError("Unable to save");
        });
    }
  }

  return (
    <form>
      <Input
        header="Extract a Recipe"
        placeholder="Enter a URL"
        name="url"
        onChange={handleInputChange}
      />
      <Error error={error} />
      <div style={{ display: "flex" }}></div>
      <Button
        disabled={!formObject.url}
        onClick={handleFormSubmit}
        display="flex"
        margin="20px auto"
        // onClick={clickMe}
      >
        <div>Click here to Extract</div>
      </Button>
    </form>
  );
}
