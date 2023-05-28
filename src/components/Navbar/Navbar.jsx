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
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h1>
        Hello,{" "}
        <span className="login-button"
          onClick={() => {
            navigate("/");
          }}
        >
          {localStorageUser.login}
        </span>
      </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Navbar;
