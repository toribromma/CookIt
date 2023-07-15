import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Logo from "./components/Logo/Logo";
import logo from "./images/logo1.jpg";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import MainPage from "./pages/main";



function App() {


  return (
    <Router>
      <Header color={"#e63946"}>
        <Logo logo={logo} alt="panda chef hat" />
      </Header>

      <Routes>
        <Route exact path="/" element={<Login/>}>
        </Route>

        <Route path="/main" element={<MainPage/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
