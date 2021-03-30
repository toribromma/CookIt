import React from "react"


export default function CardImage(props) {
    return(
        <img 
        src={props.cardImage} 
        alt={props.alt}
        style={{
            width: 250,
            height: 250,
            objectFit: "cover",
            borderRadius: "50%",
            margin: "auto",
            display: "block",
            opacity: 1,
            position: "relative",
            top: -25,
        }}
        ></img>
    )
}