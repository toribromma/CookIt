import React, { useEffect } from "react";
import setAuthToken from "../utils/setAuthToken";
import ExtractRecipeContainer from "../components/ExtractRecipeContainer/ExtractRecipeContainer";
import CardContainer from "../components/Card/CardContainer";
import Button from "../components/Button/Button";
import {useHistory} from "react-router-dom";

import jwt_decode from "jwt-decode";

const MainPage = ({ loadRecipes, setRecipes, recipes, userId, setUserId }) => {
      
  let history = useHistory();

  useEffect(() => {

    if (localStorage.jwToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      console.log("Hi");
      loadRecipes(decoded.id);
    } else {
      loadRecipes(userId);
    }

  }, []);

  const Logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    history.push("");
  };

  if(recipes === undefined) {
    return <div>Please log back in...</div>
  }

  return (
    <div>
      <ExtractRecipeContainer
        loadRecipes={loadRecipes}
        recipes={recipes}
        setRecipes={setRecipes}
        userId={userId}
        setUserId={setUserId}
      />

      <CardContainer
        loadRecipes={loadRecipes}
        recipes={recipes}
        setRecipes={setRecipes}
        userId={userId}
        setUserId={setUserId}
      />

      <Button margin="0 auto" display="flex" onClick={Logout}>Log Out</Button>
    </div>
  );
};

// }

export default MainPage;
