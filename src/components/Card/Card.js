import React from "react"

export default function Card(props) {
    return(
        <div style={{
            backgroundColor: props.color,
            height: 375,
            width: 300,
            opacity: 0.45,
            borderBottom: "1px solid",
            boxShadow: "5px 10px",
            borderRadius: 10
        }}>
            {props.children}
        </div>
    )
}