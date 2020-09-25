import React from "react"

export default function Card(props) {
    return(
        <div style={{
            backgroundColor: props.color,
            height: "fit-content",
            width: 305,
            border: props.border,
            borderRadius: 5,
            margin: "20px",
            display: "inline-block",
            padding: 10,
        }}>
            {props.children}
        </div>
    )
}