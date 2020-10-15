import React from "react"

export default function Header(props) {
    return(
        <header style={{
            backgroundColor: props.color,
            opacity: 1,
            height: 300,
            textAlign: "center",
            paddingTop: 10,
            // borderRadius: "0px 0px 20px 20px"
        }}>
            <h1 style={{
              // display: "inline",
               fontSize: "6em",
               fontWeight: 700,
               overflowWrap: "break-word",
               paddingRight: 10,
               color: "white"
               }}>cookit</h1>
            {props.children}
        </header>
    )
}