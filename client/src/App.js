import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Logo from "./components/Logo/Logo";
import logo from "./images/logo1.jpg";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import MainPage from "./pages/main";
import Detail from "./pages/Detail";
import Profile from "./components/Profile/Profile";
import NewRecipePage from "./components/SearchRecipeContainer/NewRecipePage";

function App() {
  return (
    <Router>
      <Header color={"#e63946"}>
        <Logo logo={logo} alt="panda chef hat"></Logo>
        <Profile />
      </Header>

      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route exact path="/main/recipe/:id" element={<Detail />}></Route>
        <Route exact path="/main/recipe/new/:id" element={<NewRecipePage />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
