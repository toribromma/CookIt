import React from "react"


export default function CardImage(props) {
    return(
        <img 
        src={props.cardImage} 
        placeholder={<div>No pic</div>}
        alt={props.alt}
        height={250}
        width={250}
        style={{
            objectFit: "cover",
            borderRadius: "50%",
            margin: "10px auto",
            display: "block",
            opacity: 1,
            position: "relative",
            top: -5,
        }}
        ></img>
    )
}