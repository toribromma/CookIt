import React from "react"
import "./style.css"

export default function Header(props) {
    return(
        <header style={{
            backgroundColor: props.color,
            opacity: 1,
            height: "fit-content",
            textAlign: "center",
            paddingTop: 10,
            // borderRadius: "0px 0px 20px 20px"
        }}>
            {/* <h1 className="nameOfApp">Recipe Saver</h1> */}
            {props.children}
        </header>
    )
}