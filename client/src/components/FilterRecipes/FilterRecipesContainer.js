import React, { useState, useContext } from "react";
import Context from "../../utils/Context.js"

const FilterRecipesContainer = ({loadRecipes}) => {
    const {value, value2} = useContext(Context)
    const [recipes, setRecipes] = value2

    const handleInputChange = (event) => {
        if(event.target.value != "") {
            const filteredArray = recipes.filter(recipe => {
                const lc = recipe.title.toLowerCase();
                const filter = event.target.value.toString().toLowerCase();
                return lc.includes(filter)
                // console.log(recipe)
            });
            setRecipes(filteredArray)
        }
        else {
            loadRecipes();
        }
        
    }

    return(
    <div>
        <h2>Filter through Recipes</h2>
        <input
        type="text"
        placeholder="Filter recipes"
        name="filteredArray"
        onChange={handleInputChange}
        style={{
            display: "flex",
            width: "300px",
            height: "25px",
            margin: "10px auto 50px auto",
            borderRadius: 5,
            padding: 10
                    }}
                    >
        
        </input>
    </div>
    )
}

export default FilterRecipesContainer;