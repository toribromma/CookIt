import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../utils/API";
import ExtractRecipeContainer from "../components/ExtractRecipeContainer/ExtractRecipeContainer";
import CardContainer from "../components/Card/CardContainer";
import FilterRecipesContainer from "../components/FilterRecipes/FilterRecipesContainer";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import Profile from "../components/Profile/Profile";

const MainPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // if(user) {
  //   console.log(user)
  // }
  // const [recipes, setRecipes] = useState([])

  // useEffect(()=>{
  //   if(user) {
  //     API.getRecipes(user.sub)
  //     .then((res)=>{
  //       console.log(res.data)
  //       console.log("Hi")
  //     setRecipes(res.data);
  //     console.log(recipes.length)
  //     })
  //     .catch((err) => console.log(err));

  //   }
  // },[user])
  return (
    <div>
      <Profile/>
      <ExtractRecipeContainer
        // recipes={recipes}
        // setRecipes={setRecipes}
        // userId={userId}
      /> 
      {/* <FilterRecipesContainer
        setRecipes={setRecipes}
        recipes={recipes}

      /> */}
      <CardContainer

        // recipes={recipes}
        // setRecipes={setRecipes}
        user={user}
        />

<LogoutButton/>
    </div>
  );
};

// }

export default MainPage;
