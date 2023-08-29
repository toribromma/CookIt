import React from "react";
import "./style.css";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
// import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [icon, setIcon] = useState(true);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    icon ? setIcon(false) : setIcon(true);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Logo width={"50px"} />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {icon ? (
            <svg fill="#112a46"  viewBox="0 0 100 80" width="40" height="40">
              < rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          ) : (
            <svg
              fill="#000000"
              height="30px"
              width="30px"
              viewBox="0 0 460.775 460.775"
            >
              <path fill="#112a46" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
            </svg>
          )}
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/main">Home</NavLink>
            </li>
            <li>
              <NavLink to="/searchRecipe">Search</NavLink>
            </li>
            <li>
              <NavLink to="/extractRecipe">Extract</NavLink>
            </li>
            {/* <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
