import React from "react"

export default function CardSecondHeader(props) {
    return(
        <h2
        style={{
            maxHeight: 220,
            maxWidth: 250,
            textAlign: "center",
            margin: "20px auto",
            fontSize: 26,
          }}
        >
            {props.children}
        </h2>
    )
}