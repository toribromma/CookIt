import React from 'react';
import './App.css';
import Landing from './pages/Landing';
import Logo from "./components/Logo/Logo"
import logo from "./images/chef.svg"
import Header from "./components/Header/Header"
import Navbar from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import menu from "./images/menu.svg"
function App() {
  return (
    <div style={{
      width: "100vw",
      height: "50vw",
      margin: "auto"
  }}>
    <Navbar color={"#f1faee"}>
      <Menu menu={menu}/>
    </Navbar>
      <Header color={"#e63946"}>
          <h1 style={{
              display: "inline",
               paddingRight: "0.5em",
               fontFamily: "Rubik, san-serif",
               fontSize: "3em",
               fontWeight: 700,
               }}>CooKIT</h1>
          <Logo logo={logo} alt="panda chef hat"/>
      </Header>
      <Landing>
        
        </Landing>        
  </div>
    
  );
}

export default App;
