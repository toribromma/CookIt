import React from "react"

export default function Card(props) {
    return(
        <div style={{
            backgroundColor: props.color,
            height: "fit-content",
            width: 355,
            border: props.border,
            borderRadius: 5,
            padding: 10,
            // margin: "5px 5px 10px 0px",
            margin: "10px"
        }}>
            {props.children}
        </div>
    )
}