import React, { useState, useContext } from "react";
import Context from "../../utils/Context.js";

export default function SearchRecipeContainer({ loadRecipes }) {
  const { value } = useContext(Context);
  const [user] = value;
  const [formObject, setFormObject] = useState({});
  const [error, setError] = useState();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }
return (
    <div>

    </div>
)
}
