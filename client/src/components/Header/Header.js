import React from "react"

export default function Header(props) {
    return(
        <header style={{
            backgroundColor: props.color,
            opacity: 1,
            height: 300,
            textAlign: "center",
            paddingTop: 10
        }}>
            {props.children}
        </header>
    )
}