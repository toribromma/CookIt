import React from "react"


export default function Logo(props) {
    return(
        <img 
        src={props.logo} 
        alt={props.alt}
        style={{
            width: "250px",
            height: "250px",
            borderRadius: 5,
            margin: 20
        }}
        ></img>
    )
}