import React from "react";

export default function CardListItem(props) {
  return <li style={{ margin: props.margin, width: props.width }}>{props.children}</li>;
}
