import React from "react"

export default function ExtractRecipeForm(props) {
    return(

                <input
                    style={{
                    width: "300px",
                    height: "25px",
                    margin: 20,
                    borderRadius: 5,
                    padding: 5
                            }}
                    {...props}
                    ></input>

    )
}