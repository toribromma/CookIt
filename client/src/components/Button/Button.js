import React from "react";

export default function Button(props) {
    return(
        <button 
        style={{
            backgroundColor: "#e63946",
            color: "#f1faee",
            padding: 10,
            margin: "20px auto",
            fontWeight: 500,
            width: 200,
            borderRadius: 50,
            fontSize: 15,
            border: "black solid 2px",
            boxShadow: "2px 2px 2px gray",
            float: props.float,
            display: props.display,
            justifyContent: "center"
            
        }}
        {...props} >
            {props.children}
        </button>
    )
}