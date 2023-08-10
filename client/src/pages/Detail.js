import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import API from "../utils/API";
import CardHeader from "../components/Card/CardHeader";
import CardImage from "../components/Card/CardImage";
import CardSecondHeader from "../components/Card/CardSecondHeader";
import CardList from "../components/Card/CardList";
import CardListItem from "../components/Card/CardListItem";
import TextArea from "../components/TextArea/TextArea";
import Button from "../components/Button/Button";
import toast, { Toaster } from 'react-hot-toast';


function Detail(props) {
  const [recipe, setRecipe] = useState();
  const { id } = useParams();
  
  const notify = () => toast('Recipe updated!');
 

  useEffect(() => {
    API.getRecipe(id)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err));
  }, []);

  const doSomething = (event) => {
    // setIsLoading(true)
    // console.log(isLoading)
    event.preventDefault();
    const ingredientsList = [...document.getElementsByName("ingredients")];
    const ingredients = [];
    const instructionsList = [...document.getElementsByName("instructions")];
    const instructions = [];
    const title = document.getElementsByName("title")[0].value;
    const cuisine = document.getElementsByName("cuisine")[0].value;

    console.log(title);
    console.log(cuisine);

    ingredientsList.forEach((element) => {
      ingredients.push(element.value);
    });

    instructionsList.forEach((element) => {
      instructions.push(element.value);
    });

    const data = {
      id: id,
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      cuisine: cuisine,
    };

    console.log(data);

    API.updateRecipeTitle(data)
      .then(notify())
      .then(API.getRecipe(id))
      .then((res) => setRecipe(res.data));
  };

  if (recipe) {
    return (
      <div>
      <form id={recipe._id}>
        <div style={{ textAlign: "center" }} key={recipe.thumbnail}>
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
          <CardHeader margin={"5px auto"}>Name of Recipe</CardHeader>
          <TextArea
            margin={"auto auto auto 33px"}
            name="title"
            defaultValue={recipe.title}
          ></TextArea>
          <CardHeader margin={"5px auto"}>Cuisine type</CardHeader>
          {recipe.cuisine ? (
            <TextArea
              margin={"auto auto auto 33px"}
              name="cuisine"
              defaultValue={recipe.cuisine}
            ></TextArea>
          ) : (
            <TextArea
              margin={"auto auto auto 33px"}
              name="cuisine"
              defaultValue={"Enter Cuisine types here"}
            ></TextArea>
          )}

          <CardHeader margin={"5px auto"}>Ingredients</CardHeader>
          <br></br>
          <CardList margin={"0 auto"}>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <CardListItem key={index}>
                  <TextArea
                    name="ingredients"
                    defaultValue={ingredient}
                  ></TextArea>
                </CardListItem>
              );
            })}
          </CardList>

          <CardHeader margin={"5px auto"}>Instructions</CardHeader>
          <CardList>
            {recipe.instructions.map((instruction, index) => {
              return (
                <CardListItem key={index}>
                  <TextArea
                    name="instructions"
                    defaultValue={instruction}
                  ></TextArea>
                </CardListItem>
              );
            })}
          </CardList>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button margin={"20px 5px"} onClick={doSomething}>
            Click me to submit changes
          </Button>
          <Link to={"/searchRecipe"}>
            <Button margin={"20px 5px"}>Go Back</Button>
          </Link>
        </div>
      </form>
      <Toaster />
      </div>
    );
  }
}
export default Detail;
