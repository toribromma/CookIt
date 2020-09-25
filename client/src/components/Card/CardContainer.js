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

    const [recipes, setRecipes] = useState([])

    useEffect(() =>{
        loadRecipes()
    }, [])

    function loadRecipes() {
        API.getRecipes()
            .then(res =>
                setRecipes(...res.data)
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
    
    return(
        <div>
            <CardContext.Provider value={clickToggleButton}>
                <Card border={"0.2em solid rgba(29, 53, 87, 0.4)"} color={"rgba(168, 218, 220, 1)"}>
                    <CardImage alt={"shishito"} cardImage="https://www.platingsandpairings.com/wp-content/uploads/2018/10/shishito-peppers-7.jpg"/>
                    <CardHeader>
                       {recipes.title}
                    </CardHeader>
                    <CardDescription>
                    </CardDescription>
                    <CardSecondHeader>
                        {toggleButton ? "Ingredients" : "Instructions"  }
                    </CardSecondHeader>
                    <CardList>
                        <CardListItem>
                            {toggleButton ? "1/2 pound shishito peppers" : "Get a job"  }
                        </CardListItem>
                        <CardListItem>
                            {toggleButton ? "1 Tablespoon olive oil" : "Get a job"  }
                        </CardListItem>
                        <CardListItem>
                            {toggleButton ? "1/4 teaspoon togarashi" : "Get a job"  }
                        </CardListItem>
                        <CardListItem>
                            {toggleButton ? "Coarse sea salt (such as fleur de sel or Maldon)" : "Get a job"  }</CardListItem>
                        <CardListItem>
                        {toggleButton ? "1 lemon (cut into wedges)" : "Get a job"  }
                        </CardListItem>
                    </CardList>
                    <CardButton>{toggleButton ? "Ingredients" : "Instructions"  }</CardButton>     
                </Card>
            </CardContext.Provider>
        </div>     
    )
}