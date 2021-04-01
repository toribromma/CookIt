import React from "react";

export default function ExtractRecipeForm(props) {
  return (
    <input
      style={{
        display: "flex",
        width: "300px",
        height: "25px",
        alignItems: "center",
        borderRadius: 5,
        padding: 10,
      }}
      {...props}
    ></input>
  );
}
