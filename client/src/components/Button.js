import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  const cl = `${classes.btn} ${props.className}`;
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      ref={props.input}
      onClick={props.clickHandler}
      className={cl}
    >
      {props.icon}
      {props.title}
    </button>
  );
};

export default Button;
