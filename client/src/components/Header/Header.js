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
            <h1 style={{
              // display: "inline",
               fontSize: "6em",
               fontWeight: 700,
               overflowWrap: "break-word",
               paddingRight: 10
               }}>cookit</h1>
            {props.children}
        </header>
    )
}