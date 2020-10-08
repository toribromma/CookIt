import React, {useState} from 'react';
import './App.css';
import CardContainer from './components/Card/CardContainer';
import Logo from "./components/Logo/Logo"
import logo from "./images/chef.svg"
import Header from "./components/Header/Header"
import ExtractRecipeContainer from './components/ExtractRecipeContainer/ExtractRecipeContainer';
import API from "./utils/API"
import Register from "./components/Authentication/Register"
// import jwt_decode from "jwt-decode"
// import setAuthToken from "./utils/setAuthToken"
import Login from './components/Authentication/Login';
import Context from "./utils/Context"

  //  // Check for token to keep user logged in
  // if (localStorage.jwtToken) {
  //   // Set auth token header auth
  //   const token = localStorage.jwtToken;
  //   setAuthToken(token);
  //   // Decode token and get user info and exp
  //   const decoded = jwt_decode(token);
  //   // Set user and isAuthenticated
  //   console.log(decoded)
  // // Check for expired token
  //   const currentTime = Date.now() / 1000; // to get in milliseconds
  //   if (decoded.exp < currentTime) {
  //     localStorage.removeItem("jwtToken")
  //     setAuthToken(false)
  //   }
  // }

function App() {
  
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState("");

  function loadRecipes(user) {
      API.getRecipes(user)
          .then(res =>
              setRecipes(res.data[0].recipes),
              )
              .catch(err =>console.log(err));
  }

    if(!user) {
      return (
        <div>
          <Header color={"#e63946"}>
            <Logo logo={logo} alt="panda chef hat"/>
          </Header>
          <Register setUser={setUser}/>
          <Login user={user} setUser={setUser}/>
        </div>
      )
    }

      if(!recipes) {
        return (<span>Loading...</span>)
    }

  return (
    <div style={{
      width: "100vw",
      height: "50vw",
      margin: "auto",
      fontFamily: "Rubik, san-serif",
  }}>
    {/* <Navbar color={"#1d3557"}>
      <Menu alt={"menu button"} menu={menu}/>
    </Navbar> */}
      <Header color={"#e63946"}>
          <Logo logo={logo} alt="panda chef hat"/>
      </Header>
          <Context.Provider value={[user,setUser]}>
          {/* <Context.Provider value={{value:[user,setUser], value2:[recipes,setRecipes]}}> */}
          <ExtractRecipeContainer recipes={recipes} loadRecipes={loadRecipes}/>
          <CardContainer recipes={recipes} loadRecipes={loadRecipes}/>
          </Context.Provider>
    </div>
    
  );
}

export default App;
