import React from "react"

export default function Navbar(props) {
    return(
        <nav style={{
            backgroundColor: props.color,
            height: "3rem",
            opacity: 1,
            borderBottom: "5px solid black",
            // boxShadow: "5px 10px",
            paddingTop: 5,
        }}>
            {props.children}
        </nav>
    )
}