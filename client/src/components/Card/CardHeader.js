import React from "react"

export default function CardHeader(props) {
    return(
        <h1 style={{height: "max-height", width: 300, textAlign: "center", margin: "auto"}}>
            {props.children}
        </h1>
    )
}