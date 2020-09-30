import React from "react"

export default function CardHeader(props) {
    return(
        <h1 style={{height: 115}}>
            {props.children}
        </h1>
    )
}