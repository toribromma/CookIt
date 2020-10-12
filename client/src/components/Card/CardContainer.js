import React, {useState, useEffect, useContext} from "react"
import Card from "./Card"
import CardImage from "./CardImage"
import CardHeader from "./CardHeader"
import CardSecondHeader from "./CardSecondHeader"
import CardDescription from "./CardDescription"
import CardList from "./CardList"
import CardListItem from "./CardListItem"
import CardButton from "./CardButton"
import Context from "../../utils/Context"
import API from "../../utils/API"
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

    function deleteRecipe(id) {
        API.deleteRecipe(id)
            .then(res => loadRecipes())
            .catch(err => console.log(err));
        console.log(user)
        console.log(id)
    }

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
        <div
        style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            margin: 0,
            padding: 0,
            // alignItems: "stretch"

        }}>
                {recipes.map(recipe => {
                    return (
                        <Card key={recipe._id} border={"0.2em transparent"} color={"#39e6d9"}>
                            <CardImage alt={recipe.title} cardImage={recipe.thumbnail}/>
                            <CardHeader>
                                {recipe.title}
                            </CardHeader>
                            <a target="_blank" href={recipe.href}>Link to Recipe</a>
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
                        <button onClick={() => deleteRecipe(recipe._id)} style={{fontWeight: 700}}>Delete Me</button>  
                </Card>
                    )
                })}
        </div>     
    )
            }
}