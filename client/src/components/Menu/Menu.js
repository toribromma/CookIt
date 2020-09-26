import React from "react"

export default function Menu(props) {
    return(
        <img 
        alt={props.alt} 
        src={props.menu}
        style={{
            width: "1.5em",
            height: "2em",
            padding: 5,
            cursor: "pointer"
        }}
        >
        
        </img>
    )
}