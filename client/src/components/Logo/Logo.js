import React from "react"


export default function Logo(props) {
    return(
        <img 
        src={props.logo} 
        alt={props.alt}
        style={{
            width: "4em",
            height: "4em",
            borderRadius: 5
        }}
        ></img>
    )
}