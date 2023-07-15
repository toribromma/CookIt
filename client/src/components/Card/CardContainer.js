import React, { useEffect, useState } from "react";
import Card from "./Card";
import CardImage from "./CardImage";
import CardHeader from "./CardHeader";
import API from "../../utils/API";
import ToggleContainer from "./ToggleContainer";

export default function CardContainer({user}) {
  if(user) {
    // console.log(user)
  }
  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    if(user) {
      API.getRecipes(user.sub)
      .then((res)=>{
        // console.log(res.data)
        // console.log("Hi")
      setRecipes(res.data);
      // console.log(recipes.length)
      })
      .catch((err) => console.log(err));

    }
  },[user, API.saveRecipe, recipes]   )



  const [edit, setEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState({});

  

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCurrentTitle({ ...currentTitle, [name]: value });
  }

  function deleteRecipe(id) {
    let r = window.confirm("Are you sure you want to delete?");

    if (r === true) {
      API.deleteRecipe(id)
        // .then((res) => checkJwtoken(loadRecipes))
        .catch((err) => console.log(err));

      console.log(id);
    }
  }

  const updateRecipeTitle = (id, title) => {
    console.log(id);
    setEdit(true);
    setCurrentTitle({ id: id, title: title });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    API.updateRecipeTitle({ id: currentTitle.id, title: currentTitle.title })
      // .then((res) => checkJwtoken(loadRecipes))
      .then(setEdit(false));
  };


  if (recipes === undefined) { 
    return (<span>No recipes found</span>);
  } 
  else {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "stretch",
            justifyContent: "center",
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

                <CardHeader id={recipe.user} key={recipe.title}>
                  {recipe.title}
                  {!edit ? (
                    <span
                      onClick={() =>
                        updateRecipeTitle(recipe._id, recipe.title)
                      }
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
                {edit && currentTitle.id === recipe.user ? (
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
                <ToggleContainer
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  deleteRecipe={deleteRecipe}
                  user={recipe.user}
                />
              </Card>
            );
          })}
        </div>
      </>
    );
  }

}
