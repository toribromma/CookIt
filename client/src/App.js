import React, { useState } from "react";
import "./App.css";
import API from "./utils/API";
import Logo from "./components/Logo/Logo";
import logo from "./images/logo1.jpg";
import Header from "./components/Header/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainPage from "./pages/main";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [userId, setUserId] = useState("");

  function loadRecipes(id) {
    console.log(id);
    API.getRecipes(id)
      .then((res) => {
        setRecipes(res.data[0].recipes);
      })
      .catch((err) => console.log(err));
  }



  return (
    <Router>
      <Header color={"#e63946"}>
        <Logo logo={logo} alt="panda chef hat" />
      </Header>

      <Switch>
        <Route exact path="/">
          <Login setUserId={setUserId} />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/main">
          <MainPage
            userId={userId}
            setUserId={setUserId}
            loadRecipes={loadRecipes}
            recipes={recipes}
            setRecipes={setRecipes}
          />
        </Route>
      </Switch>

 
    </Router>
  );
}

export default App;
