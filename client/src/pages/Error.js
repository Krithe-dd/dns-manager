import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Error = ({ error }) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav("/");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Not authorized to access this page. Login to continue</p>
      <Button clickHandler={handleClick} title="Login" />
    </div>
  );
};

export default Error;
