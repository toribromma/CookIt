import React, { useEffect, useState } from "react"
import Card from "./Card"
import CardImage from "./CardImage"
import CardHeader from "./CardHeader"
import CardSecondHeader from "./CardSecondHeader"
import CardDescription from "./CardDescription"
import CardList from "./CardList"
import CardListItem from "./CardListItem"
import CardButton from "./CardButton"
import CardContext from "../../utils/CardContext"
import API from "../../utils/API"

export default function CardContainer() {

    const [recipes, setRecipes] = useState()

    useEffect(() =>{
        loadRecipes()
    }, [])

    function loadRecipes() {
        API.getRecipes()
            .then(res =>
                setRecipes(res.data)
                // console.log(res.data)
                )
                .catch(err =>console.log(err));
    }

    const [toggleButton, setToggleButton] = useState(true)

    const clickToggleButton  = () => {

        if(toggleButton === false) {
            setToggleButton(true)
        }
        else {
            setToggleButton(false)
        }

        console.log("hi")
    }

    if(!recipes) {
        return (<span>Loading...</span>)
    }
    return(
        <div>
            <CardContext.Provider value={clickToggleButton}>
                {recipes.map(recipe => {
                    return (
                        <Card border={"0.2em transparent"} color={"rgba(168, 218, 220, 1)"}>
                    <CardImage alt={recipe.title} cardImage={recipe.thumbnail}/>
                    <CardHeader>
                        {recipe.title}
                    </CardHeader>
                    <CardDescription>
                    </CardDescription>
                    <CardSecondHeader>
                        {toggleButton ? "Ingredients" : "Instructions"  }
                    </CardSecondHeader>
                    {toggleButton ? 
                    <CardList>
                    {recipe.ingredients.map((ingredient, index) => {
                        return(
                            <CardListItem>{ingredient}</CardListItem>
                        )
                    })}
                    </CardList>
                    :
                    <CardList>
                    {recipe.instructions.map(instruction => {
                        return(
                            <CardListItem>{instruction}</CardListItem>
                        )
                    })}
                    </CardList>
                    }
                    <CardButton>{toggleButton ? "Instructions" : "Ingredients"  }</CardButton>     
                </Card>
                    )
                })}
            </CardContext.Provider>
        </div>     
    )
}