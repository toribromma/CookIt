import React, {useState, useEffect} from 'react';
import './App.css';
import CardContainer from './components/Card/CardContainer';
import Logo from "./components/Logo/Logo"
import logo from "./images/chef.svg"
import Header from "./components/Header/Header"
import ExtractRecipeContainer from './components/ExtractRecipeContainer/ExtractRecipeContainer';
import API from "./utils/API"
import Register from "./components/Authentication/Register"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import Login from './components/Authentication/Login';
import Context from "./utils/Context"
import FilterRecipesContainer from './components/FilterRecipes/FilterRecipesContainer';

   // Check for token to keep user logged in
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
  const [user, setUser] = useState({});
  const [toggleLandingScreen, setToggleLandingScreen] = useState(true)

  function loadRecipes() {
    console.log(user.id)
      API.getRecipes(user.id)
          .then(res =>
              setRecipes(res.data[0].recipes),
              )
              .catch(err =>console.log(err));
  }

  useEffect(() => {
     if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    console.log(decoded)
    setUser(decoded)
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      localStorage.removeItem("jwtToken")
      setAuthToken(false)
      setUser("")
    }
  }
  },[localStorage.jwtToken])

  useEffect(() => {
    if(user.id) {
      loadRecipes()
    }
  },[user])


  const toggleLandingScreenClick = () => {
    if(toggleLandingScreen === true){
      setToggleLandingScreen(false)
    }
    else {
      setToggleLandingScreen(true)
    }

  }

  const Logout = () => {
    setUser("")
    localStorage.removeItem("jwtToken")
    setAuthToken(false)
  }

    if(!user && !toggleLandingScreen) {
      return (
        <div>
          <Header color={"#e63946"}>
            <Logo logo={logo} alt="panda chef hat"/>
          </Header>
          <Register toggle={toggleLandingScreenClick} setUser={setUser}/>
          {/* <button style={{
            display: "flex",
            margin: "auto",
          }} onClick={toggleLandingScreenClick}>Login here</button> */}
        </div>
      )
    }

    if(!user && toggleLandingScreen) {
      return (
        <div>
          <Header color={"#e63946"}>
            <Logo logo={logo} alt="panda chef hat"/>
          </Header>
          <Login toggle={toggleLandingScreenClick} user={user} setUser={setUser}/>
        </div>
      )
    }

      if(!recipes) {
        return (<span>Loading...</span>)
    }

  return (
    <div>
      <Header color={"#e63946"}>
          <Logo logo={logo} alt="panda chef hat"/>
      </Header>
          {/* <Context.Provider value={[user,setUser]}> */}
          <Context.Provider value={{value:[user,setUser], value2:[recipes,setRecipes]}}>
          <ExtractRecipeContainer loadRecipes={loadRecipes}/>
          <FilterRecipesContainer loadRecipes={loadRecipes}/>
          <CardContainer  loadRecipes={loadRecipes}/>
          <button style={{
              display: "block",
              margin: "50px auto 50px auto",
              padding:"1.2em",
              backgroundColor: "#e63946",
              color: "#f1faee",
              border: "transparent",
              fontWeight: 700,
              borderRadius: 5,
              cursor: "pointer",
          }} onClick={Logout}>Log Out</button>
          </Context.Provider>
    </div>
    
  );
}

export default App;
