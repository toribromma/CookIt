import React from "react";
import "./style.css";

export default function CardList(props) {
  return (
    <ol style={{
      overflow: props.overflow,
      maxHeight: props.maxHeight,
      padding: props.padding,
      margin: props.margin
    }} className="cardList">
      {props.children}
    </ol>
  );
}
