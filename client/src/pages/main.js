import React, { useEffect } from "react";
import setAuthToken from "../utils/setAuthToken";
import ExtractRecipeContainer from "../components/ExtractRecipeContainer/ExtractRecipeContainer";
import CardContainer from "../components/Card/CardContainer";
import Button from "../components/Button/Button";
import { useHistory } from "react-router-dom";
import { checkJwtoken } from "../utils/hooks";
import FilterRecipesContainer from "../components/FilterRecipes/FilterRecipesContainer";

const MainPage = ({ loadRecipes, setRecipes, recipes }) => {
  let history = useHistory();

  useEffect(() => {
    checkJwtoken(loadRecipes);
  }, []);

  const Logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    history.push("");
  };

  if (recipes === undefined) {
    return <div>Please log back in...</div>;
  }

  return (
    <div>
      <ExtractRecipeContainer
        loadRecipes={loadRecipes}
        recipes={recipes}
        setRecipes={setRecipes}
      />
      <FilterRecipesContainer
        setRecipes={setRecipes}
        recipes={recipes}
        loadRecipes={loadRecipes}
      />
      <CardContainer
        loadRecipes={loadRecipes}
        recipes={recipes}
        setRecipes={setRecipes}
      />

      <Button margin="0 auto" display="flex" onClick={Logout}>
        Log Out
      </Button>
    </div>
  );
};

// }

export default MainPage;
