import React, { useState } from "react";
import classes from "../pages/LoginPage.module.css";
import axios from "axios";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(false);
  const [registering, setRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccessMsg("");
    if (!email || !name || !pass) {
      setError("Enter all the fields");
      return;
    }
    setRegistering(true);
    const { data } = await axios.post("/api/users/register", {
      email: email,
      password: pass,
      name: name,
    });
    if (data.message === "Success") {
      setEmail("");
      setName("");
      setPass("");
      setSuccessMsg("User created, Login to continue");
    }
    if (data.message === "Duplicate") {
      setEmailExists(true);
    }
    setRegistering(false);
  };

  return (
    <div className={classes.authFormContainer}>
      <h2>Register</h2>
      <form className={classes.registerForm} onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="full Name"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        {emailExists && <p>Email already exists</p>}
        {successMsg && <p>{successMsg}</p>}
        {error && <p>{error}</p>}
        <button disabled={registering} type="submit">
          {registering ? "Registering" : "Register"}
        </button>
      </form>
      <button
        className={classes.linkBtn}
        onClick={() => props.onFormSwitch("login")}
      >
        Already have an account? Login here.
      </button>
    </div>
  );
};
