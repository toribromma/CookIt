import React, {useState, useEffect, useContext, useCallback} from "react"
import Card from "./Card"
import CardImage from "./CardImage"
import CardHeader from "./CardHeader"
import CardSecondHeader from "./CardSecondHeader"
import CardDescription from "./CardDescription"
import CardList from "./CardList"
import CardListItem from "./CardListItem"
import CardButton from "./CardButton"
import Context from "../../utils/Context"
// import API from "../../utils/API"

export default function CardContainer({loadRecipes}) {
    const {value, value2} = useContext(Context)
    const [user, setUser] = value
    const [recipes, setRecipes] = value2
    // const [user, setUser] = useContext(Context)

    useEffect(() => {
        loadRecipes(user)
    }, [setRecipes])

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

    else {
    return(
        <div>
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
                    {recipe.ingredients.map(ingredient => {
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
                    <CardButton onClick={clickToggleButton}>{toggleButton ? "Instructions" : "Ingredients"  }</CardButton>  
                </Card>
                    )
                })}
        </div>     
    )
            }
}