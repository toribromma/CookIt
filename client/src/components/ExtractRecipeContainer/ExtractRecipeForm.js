import React from "react"

export default function ExtractRecipeForm(props) {
    return(

                <input
                    style={{
                    display: "flex",
                    width: "300px",
                    height: "25px",
                    margin: "10px auto 50px auto",
                    borderRadius: 5,
                    padding: 10
                            }}
                    {...props}
                    ></input>

    )
}