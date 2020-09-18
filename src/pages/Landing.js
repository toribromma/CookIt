import React from "react"
import Header from "../components/Header/Header"
import Logo from "../components/Logo/Logo"
import logo from "../images/chef.svg"

export default function Landing() {
    return(
        <div style={{
            width: "80vw",
            height: "50vw",
            margin: "auto"
        }}>
            <Header color={"#e63946"}>
                <h1 style={{display: "inline", paddingRight: "0.5em"}}>CooKIT</h1>
                <Logo logo={logo} alt="panda chef hat"/>
            </Header>

        </div>
    )
}