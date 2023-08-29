import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../utils/API";
import CardContainer from "../components/Card/CardContainer";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import Input from "../components/Input/index.js";

const MainPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  async function loadRecipes() {
    const results = await API.getRecipes(user.sub);
    setRecipes(results.data);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          margin: "50px auto",
        }}
      ></div>
      <Input
        style={{
          border: "2px solid black",
          flex: 1,
         
        }}
        margin="40px auto"
        header="Filter through Recipes"
        placeholder="Filter Recipes"
        name="filteredArray"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h1>Recipe List</h1>

      <CardContainer
        loadRecipes={loadRecipes}
        recipes={recipes}
        setRecipes={setRecipes}
        search={search}
        setSearch={setSearch}
      />
      <LogoutButton />
    </div>
  );
};

export default MainPage;
