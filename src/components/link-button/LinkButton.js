import React from "react";
import "./LinkButton.css";

/*
look like <a> button
*/
function LinkButton(props) {
  return <button {...props} className="link-button"></button>;
}

export default LinkButton;
