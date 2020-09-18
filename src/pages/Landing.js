import React from "react"
import Header from "../components/Header"

export default function Landing() {
    return(
        <div style={{
            width: "80vw",
            height: "50vw",
            margin: "auto"
        }}>
            <Header color={"#e63946"}>
                <h1>Cook it</h1>
            </Header>
        </div>
    )
}