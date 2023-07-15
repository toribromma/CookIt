import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/main">
          <MainPage

          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
