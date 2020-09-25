import React from "react"

export default function ExtractRecipeForm(props) {
    return(
        <div style={{
            display: "flex",
            margin: "auto",
            width: 400
            
        }}>
            <form>
                <input type="text" placeholder="Extract Recipe from Website"></input>
                {props.children}
            </form>
        </div>
    )
}