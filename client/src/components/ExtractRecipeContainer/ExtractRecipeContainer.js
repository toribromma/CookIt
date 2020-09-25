import React from "react"
import ExtractButton from "./ExtractButton"
import ExtractRecipeForm from "./ExtractRecipeForm"

export default function ExtractRecipeContainer() {



    return(
        <div>
            <ExtractRecipeForm>
                <ExtractButton>
                    Search
                </ExtractButton>
            </ExtractRecipeForm>
        </div>
    )
}