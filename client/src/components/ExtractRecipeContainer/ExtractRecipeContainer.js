import React, {useState} from "react"
import ExtractButton from "./ExtractButton"
import ExtractRecipeForm from "./ExtractRecipeForm"
import API from "../../utils/API";
import axios from "axios"

export default function ExtractRecipeContainer() {

const [formObject, setFormObject] = useState({})

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

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
	console.log(response.data);
})
.catch(err => {
	console.log(err);
});
    //   API.saveRecipe({
    //     title: formObject.title,
    //     author: formObject.author,
    //     synopsis: formObject.synopsis
    //   })
    //     .then(res => loadBooks())
    //     .catch(err => console.log(err));
    }
  };


    return(
        <form
        style={{
            margin: "auto",
        }}>
            <ExtractRecipeForm
                type="text" 
                placeholder="Extract Recipe from Website"
                name="url"
                onChange={handleInputChange}
            >
            </ExtractRecipeForm>
            <ExtractButton
                disabled={!(formObject.url)}
                onClick={handleFormSubmit}
            >
            Extract
            </ExtractButton>
        </form>
    )
}