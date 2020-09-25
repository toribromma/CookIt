import React, {useContext} from "react";
import CardContext from "../../utils/CardContext"

export default function CardButton(props) {

    const triggerButton = useContext(CardContext)

    return(
        <button onClick={triggerButton} >
            {props.children}
        </button>
    )
}