import React, { useState } from "react";
import classes from "../pages/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = (props) => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [invalidFields, setInvalidFields] = useState({
    email: false,
    password: false,
  });
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalidFields({ email: false, password: false });
    setIncorrectPassword(false);

    if (!email) {
      setInvalidFields((prev) => {
        return { ...prev, email: true };
      });
      return;
    }
    if (!pass) {
      setInvalidFields((prev) => {
        return { ...prev, password: true };
      });
      return;
    }
    setSubmit(true);
    const { data } = await axios.post(
      "/api/users/login",
      {
        email: email,
        password: pass,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.message === "Success") {
      localStorage.setItem("userName", data.user.name);
      nav("/dashboard");
    }
    if (data.message === "Error") {
      setIncorrectPassword(true);
    }
    setSubmit(false);
  };

  return (
    <div className={classes.authFormContainer}>
      <h2>Login</h2>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        {invalidFields.email && <p>Enter a valid email</p>}
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        {invalidFields.password && <p>Enter a valid password</p>}
        {incorrectPassword && <p>Incorrect Password</p>}
        <button disabled={submit} type="submit">
          {submit ? "Logging In..." : "Log In"}
        </button>
      </form>
      <button
        className={classes.linkBtn}
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
