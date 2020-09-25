import React, { useState } from "react"
import Card from "./Card"
import CardImage from "./CardImage"
import CardHeader from "./CardHeader"
import CardSecondHeader from "./CardSecondHeader"
import CardDescription from "./CardDescription"
import CardList from "./CardList"
import CardListItem from "./CardListItem"
import CardButton from "./CardButton"
import CardContext from "../../utils/CardContext"

export default function CardContainer() {

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
                        Blistered Shishito Peppers
                    </CardHeader>
                    <CardDescription>
                        These Blistered Shishito Peppers are the perfect finger food. They're so easy to make too. Lightly seasoned and slightly smoky, you'll find that most are mild... one out of every ten might surprise you. 
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
        <Card border={"0.2em solid rgba(29, 53, 87, 0.4)"} color={"rgba(168, 218, 220, 1)"}>
            <CardImage alt={"shishito"} cardImage="https://i1.wp.com/www.walderwellness.com/wp-content/uploads/2019/08/Basil-Walnut-Pesto-Linguine-With-Shrimp-Walder-Wellness.jpg?resize=768%2C1152&ssl=1"/>
            <CardHeader>
                Basil Walnut Pesto Linguine With Shrimp
            </CardHeader>
            <CardDescription>
            Summer pasta at its finest. This basil walnut pesto linguine is paired with shrimp and arugula. Simple, nutritious, and ready in 30 minutes! 
            </CardDescription>
            <CardSecondHeader>
                Ingredients
            </CardSecondHeader>
            <CardList>
                <CardListItem>Approx. 16 large shrimp</CardListItem>
                <CardListItem>1 Tbsp extra virgin olive oil</CardListItem>
                <CardListItem>1/4 tsp garlic powderi</CardListItem>
                <CardListItem>Approx. 112 grams linguine, dry (almost 4 ounces; enough for 2)</CardListItem>
                <CardListItem>1-2 large handfuls baby arugula</CardListItem>
            </CardList>
            <CardButton>Instructions</CardButton>
                 
        </Card>
        </div>     
    )
}