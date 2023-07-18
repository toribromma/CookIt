import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../utils/API";
import ExtractRecipeContainer from "../components/ExtractRecipeContainer/ExtractRecipeContainer";
import CardContainer from "../components/Card/CardContainer";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import Profile from "../components/Profile/Profile";

const MainPage = () => {
  const { user } = useAuth0();
  const [recipes, setRecipes] = useState([]);

  async function loadRecipes() {
    console.log(user.sub)
    const results = await API.getRecipes(user.sub)
    console.log(results.data)
    setRecipes(results.data)
  }

  return (
    <div>
      <Profile />
      <ExtractRecipeContainer
      loadRecipes={loadRecipes}
      user={user} />
      <CardContainer user={user} 
      loadRecipes={loadRecipes}
      recipes={recipes}
      setRecipes={setRecipes} />
      <LogoutButton />
    </div>
  );
};
export default MainPage;
