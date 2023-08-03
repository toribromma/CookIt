import React, { useState } from "react";
import Button from "../Button/Button";
import Error from "../Error/index";
import Input from "../Input/index";
import API from "../../utils/API";
import { useAuth0 } from "@auth0/auth0-react";
import toast, { Toaster } from "react-hot-toast";

export default function ExtractRecipeContainer({ loadRecipes }) {
  const { user } = useAuth0();
  const [formObject, setFormObject] = useState({});
  const [error, setError] = useState();
  const notify = () =>
    toast("Recipe has been extracted and saved in your list!");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    setError("Loading...");

    if (formObject.url) {
      const data = {
        url: formObject.url,
        user: user.sub,
      };
      API.saveRecipe(data)
        .then(() => setError(""))
        .then(() => loadRecipes())
        .then(notify())

        // .then(alert.show("Success!", {type: "success"}))
        .catch((err) => {
          console.log(err);
          setError("Unable to save");
        });
    }
  }

  return (
    <>
      <form>
        <Input
          header="Extract a Recipe"
          placeholder="Enter a URL"
          name="url"
          onChange={handleInputChange}
        />
        <Error error={error} />
        <div style={{ display: "flex" }}></div>
        <Button
          disabled={!formObject.url}
          onClick={handleFormSubmit}
          display="block"
          margin="5px auto"
        >
          <div>Click here to Extract</div>
        </Button>
      </form>
      <Toaster />
    </>
  );
}
