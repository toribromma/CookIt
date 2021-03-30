import React from "react"

export default function CardList(props) {
    return(
        <ol style={{
            overflow: "scroll",
            height: "400px",
            maxWidth: "500px",
            margin: "auto"
        }}>
            {props.children}
        </ol>
    )
}