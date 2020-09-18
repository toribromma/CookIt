import React from "react"

export default function Header(props) {
    return(
        <header style={{
            backgroundColor: props.color,
            opacity: 0.85,
            height: 300,
            width: "100%",
            fontFamily: "Rubik, san-serif",
            fontSize: "3em",
            fontWeight: 700,
            textAlign: "center",
            paddingTop: 100,
            marginTop: 50
        }}>
            {props.children}
        </header>
    )
}