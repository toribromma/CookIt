import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Recipes = ({ recipes }) => {
  if (!recipes) {
    return <div></div>;
  }
  if (recipes.length > 0) {
    return (
      <div
        style={{
          maxWidth: 300,
          margin: "0 auto",
          overflow: "scroll",
          height: 400,
        }}
      >
        {recipes.map((recipe) => (
          <div>
            <ol id={recipe.id}>
              <li>{recipe.title}</li>
              <img width={100} src={recipe.image}></img>
            </ol>
            <Link to={"recipe/new/" + recipe.id}>
              <Button width={100} fontSize={12} height={30}>
                Recipe Info
              </Button>
            </Link>
          </div>
        ))}
      </div>
    );
  }
};

export default Recipes;
