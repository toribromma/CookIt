import React from "react";

export default function ExtractButton(props) {
    return(
            <button {...props}
            >
                {props.children}
            </button>
    )

}