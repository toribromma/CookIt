import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import Logo from "./components/Logo/Logo";
import logo from "./images/logo1.jpg";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import MainPage from "./pages/main";
import Detail from "./pages/Detail";
import Profile from "./components/Profile/Profile";
import NewRecipePage from "./components/SearchRecipeContainer/NewRecipePage";
import NavBar from "./components/Navbar/Navbar";
import SearchRecipeContainer from "./components/SearchRecipeContainer/SearchRecipeContainer";
import ExtractRecipeContainer from "./components/ExtractRecipeContainer/ExtractRecipeContainer";

function App() {
  const { user, isAuthenticated } = useAuth0();


  return (
    <Router>
        {user && (
    <NavBar></NavBar>
  )}

      <Header color={"#e63946"}>
        <Logo logo={logo} alt="panda chef hat"></Logo>
      </Header>
      {/* <Profile /> */}

      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/searchRecipe" element={<SearchRecipeContainer />}></Route>
        <Route
          path="/extractRecipe"
          element={<ExtractRecipeContainer />}
        ></Route>
        <Route
          exact
          path="/extractRecipe/recipe/:id"
          element={<Detail />}
        ></Route>
        <Route
          exact
          path="/searchRecipe/recipe/new/:id"
          element={<NewRecipePage />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
