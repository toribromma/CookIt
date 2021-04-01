import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import CardImage from "./CardImage";
import CardHeader from "./CardHeader";
import CardSecondHeader from "./CardSecondHeader";
// import CardDescription from "./CardDescription"
import CardList from "./CardList";
import CardListItem from "./CardListItem";
import CardButton from "./CardButton";
import Context from "../../utils/Context";
import API from "../../utils/API";
import ToggleContainer from "./ToggleContainer";

// import API from "../../utils/API"

export default function CardContainer({ loadRecipes }) {
  const { value, value2 } = useContext(Context);
  const [user] = value;
  const [recipes, setRecipes] = value2;
  // const [toggleButton, setToggleButton] = useState(true);
  const [edit, setEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCurrentTitle({ ...currentTitle, [name]: value });
  }

  function deleteRecipe(id) {
    let r = window.confirm("Are you sure you want to delete?");

    if (r == true) {
      API.deleteRecipe(id)
        .then((res) => loadRecipes())
        .catch((err) => console.log(err));
      console.log(user);
      console.log(id);
    }
  }

  // const clickToggleButton = () => {
  //   if (toggleButton === false) {
  //     setToggleButton(true);
  //   } else {
  //     setToggleButton(false);
  //   }

  //   console.log("hi");
  // };

  const updateRecipeTitle = (id, title) => {
    //    e.preventDefault();
    // var selectedTitle = document.getElementById(id)
    console.log(id);
    setEdit(true);
    setCurrentTitle({ id: id, title: title });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    API.updateRecipeTitle({ id: currentTitle.id, title: currentTitle.title })
      .then((res) => loadRecipes())
      .then(setEdit(false));
  };

  if (!recipes) {
    return <span>No recipes found</span>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center", // margin: 0,
          padding: 2,
          margin: "auto",
        }}
      >
        {recipes.map((recipe) => {
          return (
            <Card
              className="card"
              key={recipe._id}
              border={"1.5px solid black"}
              color={"transparent"}
            >
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

              <CardHeader id={recipe._id} key={recipe.title}>
                {recipe.title}
                {!edit ? (
                  <span
                    onClick={() => updateRecipeTitle(recipe._id, recipe.title)}
                    style={{
                      paddingLeft: 10,
                      fontSize: 10,
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </span>
                ) : (
                  ""
                )}
              </CardHeader>
              {edit && currentTitle.id === recipe._id ? (
                <form onSubmit={submitUpdate}>
                  <input
                    style={{ width: "85%", margin: 10, padding: 5 }}
                    name="title"
                    value={currentTitle.title}
                    onChange={handleInputChange}
                  />
                  <button
                    style={{
                      margin: 3,
                      padding: 5,
                      display: "inline",
                      border: "black solid 0.4px",
                    }}
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    style={{
                      margin: 3,
                      padding: 5,
                      display: "inline",
                      border: "black solid 0.4px",
                    }}
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                ""
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
              {/* <CardDescription>
                            </CardDescription> */}
              <ToggleContainer
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
                deleteRecipe={deleteRecipe}
                // toggleButton={toggleButton}
                // clickToggleButton={clickToggleButton}
                id={recipe._id}
              />
              {/* <CardSecondHeader>
                {toggleButton ? "Ingredients" : "Instructions"}
              </CardSecondHeader>
              {toggleButton ? (
                <CardList>
                  {recipe.ingredients.map((ingredient, index) => {
                    return (
                      <CardListItem key={index}>{ingredient}</CardListItem>
                    );
                  })}
                </CardList>
              ) : (
                <CardList>
                  {recipe.instructions.map((instruction, index) => {
                    return (
                      <CardListItem key={index}>{instruction}</CardListItem>
                    );
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
                <CardButton onClick={clickToggleButton}>
                  {toggleButton ? "Instructions" : "Ingredients"}
                </CardButton>
                <CardButton onClick={() => deleteRecipe(recipe._id)}>
                  Delete Me
                </CardButton>
              </div> */}
            </Card>
          );
        })}
      </div>
    );
  }
}
