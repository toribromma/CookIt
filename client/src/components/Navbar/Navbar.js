import React from "react"
import "./style.css"

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          {/* <Brand />
           */}
           <div>Logo</div>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <div>hamburger</div>
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
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
  )
}

export default Navbar