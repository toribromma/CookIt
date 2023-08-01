import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import CardImage from "./CardImage";
import CardHeader from "./CardHeader";
import API from "../../utils/API";
import ToggleContainer from "./ToggleContainer";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import CardSecondHeader from "./CardSecondHeader";


export default function CardContainer({
  user,
  recipes,
  setRecipes,
  loadRecipes,
  search,
  setSearch,
}) {


  useEffect(() => {
    if (user) {
      API.getRecipes(user.sub)
        .then((res) => {
          if (search) {
            const filter = recipes.filter((recipe) => {
              return recipe.title.toLowerCase().includes(search.toLowerCase());
            });
            setRecipes(filter);
          } else {
            setRecipes(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, search]);

  function deleteRecipe(id) {
    let r = window.confirm("Are you sure you want to delete?");

    if (r === true) {
      API.deleteRecipe(id)
        // .then(alert.show("Success!", { type: "success" }))
        .then(loadRecipes)
        .catch((err) => console.log(err));
    }
  }

  if (recipes.length > 0) {
    return (
      <>
        <h1>
          <u>List of Recipes</u>
        </h1>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            margin: "auto",
            height: "fit-content",
          }}
        >
          {recipes.map((recipe) => {
            return (
              <Card className="card" key={recipe._id}>
                {!recipe.thumbnail ? (
                  <div
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  >
                    No picture found
                  </div>
                ) : (
                  <CardImage alt={recipe.title} cardImage={recipe.thumbnail} />
                )}
                <CardHeader
                  margin={"5px auto"}
                  id={recipe._id}
                  key={recipe._id}
                >
                  {recipe.title}
                </CardHeader>
                {recipe.cuisine ? (
                  <CardSecondHeader>
                    {/* {recipe.cuisine.map((cuisine) => { */}
                    Cuisine Types: {recipe.cuisine}
                    {/* })} */}
                  </CardSecondHeader>
                ) : (
                  <CardSecondHeader>Cuisine type not found</CardSecondHeader>
                )}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: 600,
                  }}
                  href={recipe.href}
                >
                  <div style={{ textAlign: "center", marginTop: 15 }}>
                    Link to Recipe
                  </div>
                </a>
                <ToggleContainer
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  id={recipe._id}
                />
                <Link to={"recipe/" + recipe._id}>
                  <Button>Edit Mode</Button>
                </Link>
                <Button
                  margin={"5px auto"}
                  display="flex"
                  onClick={() => deleteRecipe(recipe._id)}
                >
                  Delete Me
                </Button>
              </Card>
            );
          })}
        </div>
      </>
    );
  }
}
