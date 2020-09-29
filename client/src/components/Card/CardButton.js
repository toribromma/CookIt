import React from "react";

export default function CardButton(props) {
    return(
        <button {...props} >
            {props.children}
        </button>
    )
}