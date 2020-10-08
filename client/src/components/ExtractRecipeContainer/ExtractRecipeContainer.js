import React, {useState, useContext} from "react"
import ExtractButton from "./ExtractButton"
import ExtractRecipeForm from "./ExtractRecipeForm"
import API from "../../utils/API";
import axios from "axios"
import Context from "../../utils/Context.js"

export default function ExtractRecipeContainer({loadRecipes}) {
// const [user, setUser] = useContext(Context)
const {value, value2} = useContext(Context)
const [user, setUser] = value
const [formObject, setFormObject] = useState({})

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // function clickMe(event) {
  //   event.preventDefault();
  //   console.log(user)
  // }

    // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.url) {
        axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${formObject.url}?forceExtraction=true`, {
	"headers": {
        "Content-Type":"application/json",
		"X-RapidApi-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"X-RapidApi-Key": process.env.REACT_APP_API_KEY
	}
})
.then(response => {
  const {sourceUrl, title, image, analyzedInstructions:[{steps:[...steps]}], extendedIngredients:[...ingredients]} = response.data
  let instructions = steps.map(i => i.step)
  let ingredientsArray = ingredients.map(i => i.original)

  API.saveRecipe({
    title: title,
    thumbnail: image,
    href: sourceUrl,
    instructions: instructions,
    ingredients: ingredientsArray,
    user:user
  })
    .then(() => loadRecipes(user))
})
.catch(err => {
	console.log(err);
});
    }
  };


    return(
        <form
        style={{
            margin: "auto",
        }}>
            <ExtractRecipeForm
                type="text" 
                placeholder="Copy and Paste URL of Recipe here"
                name="url"
                onChange={handleInputChange}
            >
            </ExtractRecipeForm>
            <ExtractButton
                disabled={!(formObject.url)}
                onClick={handleFormSubmit}
                // onClick={clickMe}
            >
            Click here to Extract
            </ExtractButton>
        </form>
    )
}