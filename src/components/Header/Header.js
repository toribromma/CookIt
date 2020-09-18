import React from "react"

export default function Header(props) {
    return(
        <header style={{
            backgroundColor: props.color,
            opacity: 0.85,
            height: 175,
            textAlign: "center",
            paddingTop: 100,
        }}>
            {props.children}
        </header>
    )
}