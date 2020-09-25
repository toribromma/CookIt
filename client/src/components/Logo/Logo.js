import React from "react"


export default function Logo(props) {
    return(
        <img 
        src={props.logo} 
        alt={props.alt}
        style={{
            width: "2em",
            height: "2em",
        }}
        ></img>
    )
}