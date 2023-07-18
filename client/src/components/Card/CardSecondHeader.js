import React from "react"

export default function CardSecondHeader(props) {
    return(
        <h2
        style={{
            maxHeight: 220,
            width: 200,
            textAlign: "center",
            margin: "auto",
            fontSize: 14,
          }}
        >
            {props.children}
        </h2>
    )
}