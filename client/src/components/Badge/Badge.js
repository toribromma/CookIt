import React from 'react'
import "./style.css"
function Badge(props) {
  return (
    <span className={props.class}> {props.cuisine}</span>
  )
}

export default Badge