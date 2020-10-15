import React from "react"

export default function CardList(props) {
    return(
        <ol style={{
            overflow: "scroll",
            height: "300px",
            maxWidth: "350px",
            margin: "auto"
        }}>
            {props.children}
        </ol>
    )
}