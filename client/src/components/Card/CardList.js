import React from "react";
import "./style.css";

export default function CardList(props) {
  return <ol className="cardList">{props.children}</ol>;
}
