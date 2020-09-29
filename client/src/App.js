import React, {useEffect, useState} from 'react';
import './App.css';
import CardContainer from './components/Card/CardContainer';
import Logo from "./components/Logo/Logo"
import logo from "./images/chef.svg"
import Header from "./components/Header/Header"
import ExtractRecipeContainer from './components/ExtractRecipeContainer/ExtractRecipeContainer';
import API from "./utils/API"

function App() {
 
  const [recipes, setRecipes] = useState([])

  useEffect(() =>{
      loadRecipes()
  }, [recipes])

  function loadRecipes() {
      API.getRecipes()
          .then(res =>
              setRecipes(res.data)
              )
              .catch(err =>console.log(err));
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
          <h1 style={{
              // display: "inline",
               fontSize: "6em",
               fontWeight: 700,
               overflowWrap: "break-word",
               paddingRight: 10
               }}>cookit</h1>
          <Logo logo={logo} alt="panda chef hat"/>
      </Header>
          <ExtractRecipeContainer loadRecipes ={loadRecipes()}/>
          <CardContainer recipes={recipes} />
    </div>
    
  );
}

export default App;
