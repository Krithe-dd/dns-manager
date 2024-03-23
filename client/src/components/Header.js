import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import axios from "axios";
import Button from "./Button";

const Header = () => {
  const [userName] = useState(localStorage.getItem("userName") || "");

  const nav = useNavigate();
  const handleLogout = async () => {
    const { data } = await axios.get("/api/auth/logout");
    localStorage.removeItem("userName");
    nav("/");
  };
  return (
    <div>
      <header className={classes.header}>
        <h2 className={classes.logo}>DNS Manager</h2>
        <div className={classes.navLinks}>
          <div>{userName}</div>
          <Button clickHandler={handleLogout} title="Logout" />
        </div>
      </header>
    </div>
  );
};

export default Header;
