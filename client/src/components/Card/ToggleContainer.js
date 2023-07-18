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

    // console.log("hi");
  };

  const clickToggleBox = () => {
    if (toggleBox === true) {
      setToggleBox(false);
    } else {
      setToggleBox(true);
    }

    // console.log("hi");
  };

  return (
    <div>
      <CardSecondHeader key={id}>
        {toggleButton ? "Ingredients" : "Instructions"}
        <Button
        fontSize={10}
        margin={"10px 5px"}
          onClick={clickToggleButton}
        >
          {toggleButton ? "Instructions" : "Ingredients"}
        </Button>
      </CardSecondHeader>
      {toggleBox ? (
        <Button margin="10px auto" display="flex" justifyContent="center" onClick={clickToggleBox}>
          <i className="fas fa-expand-alt"></i>
        </Button>
      ) : (
        <Button margin="10px auto" display="flex" onClick={clickToggleBox}>
          <i className="far fa-times-circle"></i>
        </Button>
      )}
      {toggleBox ? (
        <div></div>
      ) : (
        <div>
          {toggleButton ? (
            <CardList>
              {ingredients.map((ingredient) => {
                return <CardListItem>{ingredient}</CardListItem>;
              })}
            </CardList>
          ) : (
            <CardList>
              {instructions.map((instruction) => {
                return <CardListItem>{instruction}</CardListItem>;
              })}
            </CardList>
          )}
          <Button
            margin={"5px auto"}
            display="flex"
            onClick={() => deleteRecipe(id)}
          >
            Delete Me
          </Button>
        </div>
      )}
    </div>
  );
}
