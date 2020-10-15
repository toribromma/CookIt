import React from "react"

export default function CardHeader(props) {
    return(
        <h1 style={{height: "max-height"}}>
            {props.children}
        </h1>
    )
}