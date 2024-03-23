import React, { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className={classes.App}>
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
};

export default LoginPage;
