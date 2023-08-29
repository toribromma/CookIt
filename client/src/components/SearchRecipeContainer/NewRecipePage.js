import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Card from "../Card/Card";
import API from "../../utils/API";
import CardHeader from "../Card/CardHeader";
import CardImage from "../Card/CardImage";
import CardSecondHeader from "../Card/CardSecondHeader";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button/Button";
import ToggleContainer from "../Card/ToggleContainer";
import { useAuth0 } from "@auth0/auth0-react";
import Badge from "../Badge/Badge";

function NewRecipePage(props) {
  const { user } = useAuth0();
  const [recipe, setRecipe] = useState();
  const { id } = useParams();
  const location = useLocation();
  const { recipes } = location.state;
  const notifyGood = () => toast("Recipe save was successful");
  const notifyBad = () => toast("Recipe save was not successful");

  console.log(recipes);

  useEffect(() => {
    API.getNewRecipe(id)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    recipe.user = user.sub;

    API.saveNewRecipe(recipe)
      .then(notifyGood())
      .catch((err) => {
        console.log(err);
        notifyBad;
      });
  };

  // if (recipe) {
  return (
    <div>
      {recipe && (
        <Card>
          {recipe.thumbnail && (
            <CardImage alt={recipe.title} cardImage={recipe.thumbnail} />
          )}
          <CardHeader margin={"5px auto"}>{recipe.title}</CardHeader>
          {recipe.cuisine && (
            <div>
              <CardSecondHeader>Cuisine Types: </CardSecondHeader>
              {recipe.cuisine.split(",").map((cuisine) => (
                <Badge class={"cuisineBadge"} cuisine={cuisine}/>
              ))}
            </div>
          )}
          <ToggleContainer
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            id={id}
          />

          <Button onClick={handleFormSubmit}>Save Recipe</Button>
        </Card>
      )}

      {recipes && <h1>Other Related Recipes</h1>}
      <div style={{ margin: "0 auto" }}>
        {recipes &&
          recipes
            .filter((recipe) => recipe.id != id)
            .map((recipe) => (
              <div style={{ display: "inline-block" }} key={recipe.id}>
                <ol id={recipe.id}>
                  <CardHeader>{recipe.title}</CardHeader>
                  <img
                    width={200}
                    style={{ borderRadius: 200 }}
                    src={recipe.image}
                  ></img>
                </ol>
                <Link
                  to={"/searchRecipe/recipe/new/" + recipe.id}
                  state={{ recipes: recipes }}
                >
                  <Button>Recipe Info</Button>
                </Link>
              </div>
            ))}
      </div>

      <Link to={"/searchRecipe"}>
        <Button margin={"20px 5px"}>Go back</Button>
      </Link>
      <Toaster />
    </div>
  );
  // }
}
export default NewRecipePage;
