import React, { useState, useContext } from "react";
import Button from "../Button/Button"
import Error from "../Error/index"
import Input from "../Input/index"
import API from "../../utils/API";
import axios from "axios";
import Context from "../../utils/Context.js";

export default function ExtractRecipeContainer({ loadRecipes }) {
  const { value } = useContext(Context);
  const [user] = value;
  const [formObject, setFormObject] = useState({});
  const [error, setError] = useState();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    console.log("Hi")

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
        .then((response) => {
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
            user: user.id,
          })
            .then(() => loadRecipes(user))
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
    <Error error={error}/>
    <div style={{display: "flex"}}>
      
    </div>
      <Button
        disabled={!formObject.url}
        onClick={handleFormSubmit}
        display="flex"
        margin="auto"
        // onClick={clickMe}
      >
        <div>Click here to Extract</div>
      </Button>
    </form>
  );
}
