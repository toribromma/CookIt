import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import CardHeader from "../Card/CardHeader";

const Recipes = ({ recipes }) => {
  if (!recipes) {
    return <div></div>;
  }
  if (recipes.length > 0) {
    return (
      <div
        style={{
          // maxWidth: 300,
          justifyContent: "center",
          margin: "0 auto",
          height: 400,
          display: "flex",
          flexWrap: "wrap"
          
        }}
      >
        {recipes.map((recipe) => (
          <div 
          key={recipe.id}>
            <ol id={recipe.id}>
              <CardHeader>{recipe.title}</CardHeader>
              <img width={200} style={{borderRadius: 200}} src={recipe.image}></img>
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
