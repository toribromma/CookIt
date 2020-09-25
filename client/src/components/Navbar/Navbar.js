import React from "react"

export default function Navbar(props) {
    return(
        <nav style={{
            backgroundColor: props.color,
            height: "5rem",
            opacity: 0.75,
            borderBottom: "1px transparent",
            boxShadow: "5px 10px",
            paddingTop: 10,
        }}>
            {props.children}
        </nav>
    )
}