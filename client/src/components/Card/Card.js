import React from "react"

export default function Card(props) {
    return(
        <div style={{
            backgroundColor: props.color,
            height: "600px",
            // width: "max-width",
            border: props.border,
            borderRadius: 5,
            padding: 10,
            margin: "2px"
        }}>
            {props.children}
        </div>
    )
}