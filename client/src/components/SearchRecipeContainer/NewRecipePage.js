import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../Card/Card";
import API from "../../utils/API";
import CardHeader from "../Card/CardHeader";
import CardImage from "../Card/CardImage";
import CardSecondHeader from "../Card/CardSecondHeader";
import CardList from "../Card/CardList";
import CardListItem from "../Card/CardListItem";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import ToggleContainer from "../Card/ToggleContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { useAlert } from 'react-alert'


function NewRecipePage(props) {
  const { user } = useAuth0();
  const [recipe, setRecipe] = useState();
  const { id } = useParams();
  const alert = useAlert()


  useEffect(() => {
    API.getNewRecipe(id)
      .then((res) => setRecipe(res.data))
      //   .then((navigate("/main")))
      .catch((err) => console.log(err));
    //   navigate("/main")
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(recipe)
    // console.log(user.sub)
    recipe.user = user.sub;
    // console.log(recipe)
    API.saveNewRecipe(recipe).then((
    (alert.show("Success!", {type: "success"}))

    )).catch(err);
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
            <CardSecondHeader>Cuisine Types: {recipe.cuisine}</CardSecondHeader>
          )}
          <ToggleContainer
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            id={id}
          />

          <Button onClick={handleFormSubmit}>Save Recipe</Button>
        </Card>
        )}
        
        <Link to={"/main"}>
          <Button margin={"20px 5px"}>Go to Main Page</Button>
        </Link>
      </div>
    );
  // }
}
export default NewRecipePage;
