import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import "./styles.css";

const Navbar = () => {
  const { localStorageUser, setLocalStorageUser } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocalStorageUser("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h1>Hello, {localStorageUser.login}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Navbar;
