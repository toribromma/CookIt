import React, {useState, useContext} from "react"
import ExtractButton from "./ExtractButton"
import ExtractRecipeForm from "./ExtractRecipeForm"
import API from "../../utils/API";
import axios from "axios"
import Context from "../../utils/Context.js"

export default function ExtractRecipeContainer({loadRecipes}) {

  const {value} = useContext(Context)
  const [user] = value
  const [formObject, setFormObject] = useState({})
  const [error, setError] = useState()


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.url) {
        axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=${formObject.url}`, {
	"headers": {
        "Content-Type":"application/json",
		"X-RapidApi-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"X-RapidApi-Key": process.env.REACT_APP_API_KEY
	}
})
.then(response => {
  console.log(response.data)
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
    .then(() => setError(""))
})
.catch(err => {
  console.log(err);
  setError("Unable to save")
  
});
    }
  };


    return(
        <form
        style={{
            margin: "auto",
        }}>
          <h2>Extract Recipe</h2>
            <ExtractRecipeForm
                type="text" 
                placeholder="Copy and Paste URL of Recipe here"
                name="url"
                onChange={handleInputChange}
            >
            </ExtractRecipeForm>
            <div style={{
              display: "block",
              margin: "auto",
              textAlign: "center",
              fontWeight: 700
            }}>{error}</div>
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