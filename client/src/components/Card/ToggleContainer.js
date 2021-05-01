import React, { useState } from "react";
import CardSecondHeader from "./CardSecondHeader";
import CardList from "./CardList";
import CardListItem from "./CardListItem";
import Button from "../Button/Button";

export default function ToggleContainer({
  deleteRecipe,
  ingredients,
  instructions,
  id,
}) {
  const [toggleButton, setToggleButton] = useState(true);
  const [toggleBox, setToggleBox] = useState(true);

  const clickToggleButton = () => {
    if (toggleButton === false) {
      setToggleButton(true);
    } else {
      setToggleButton(false);
    }

    console.log("hi");
  };

  const clickToggleBox = () => {
    if (toggleBox === false) {
      setToggleBox(true);
    } else {
      setToggleBox(false);
    }

    console.log("hi");
  };

  return (
    <div>
      {toggleBox ? (
        <Button
          margin="10px auto"
          display="flex"
          onClick={clickToggleBox}
        >
          <i className="fas fa-expand-alt"></i>
        </Button>
      ) : (
        <Button
          margin="10px auto"
          display="flex"
          onClick={clickToggleBox}
        >
          <i className="far fa-times-circle"></i>
        </Button>
      )}
      <CardSecondHeader>
        {toggleButton ? "Ingredients" : "Instructions"}
      </CardSecondHeader>
      {toggleBox ? (
        <div></div>
      ) : (
        <div>
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
          <Button
            margin={"5px 5px"}
            display="inline-block"
            onClick={clickToggleButton}
          >
            {toggleButton ? "Instructions" : "Ingredients"}
          </Button>
          <Button
            margin={"5px 5px"}
            display="inline-block"
            onClick={() => deleteRecipe(id)}
          >
            Delete Me
          </Button>
        </div>
      )}
    </div>
  );
  //   }
}
