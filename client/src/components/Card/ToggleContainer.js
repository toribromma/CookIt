import React, { useEffect, useState } from "react";
import CardSecondHeader from "./CardSecondHeader";
import CardList from "./CardList";
import CardListItem from "./CardListItem";
import Button from "../Button/Button"

export default function ToggleContainer({
  deleteRecipe,
  ingredients,
  instructions,
  id,
}) {
  const [toggleButton, setToggleButton] = useState(true);
  const [ingredients1, setIngredients] = useState(["hi"]);

  const clickToggleButton = () => {
    if (toggleButton === false) {
      setToggleButton(true);
    } else {
      setToggleButton(false);
    }

    console.log("hi");
  };

  useEffect(() => {
    setTimeout(() => {
      setIngredients(ingredients);
    }, 1000);
  }, [ingredients, setIngredients]);

  if (!ingredients) {
    return <div></div>;
  } else
    return (
      <div>
        <CardSecondHeader>
          {toggleButton ? "Ingredients" : "Instructions"}
        </CardSecondHeader>
        {toggleButton ? (
          <CardList>
            {ingredients.map((ingredient, index) => {
              return <CardListItem key={index}>{ingredient}</CardListItem>;
            })}
          </CardList>
        ) : (
          <CardList>
            {instructions.map((instruction, index) => {
              return <CardListItem key={index}>{instruction}</CardListItem>;
            })}
          </CardList>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Button margin={15} onClick={clickToggleButton}>
            {toggleButton ? "Instructions" : "Ingredients"}
          </Button>
          <Button margin={15} onClick={() => deleteRecipe(id)}>Delete Me</Button>
        </div>
      </div>
    );
  //   }
}
