import { useEffect, useState } from "react";

import getUsers from "../utils/getUsers";

const Authorization = () => {
  const [changeAuth, setChangeAuth] = useState(true);
  const [users, setUsers] = useState([]);

  const handleChangeAuth = () => {
    setChangeAuth(!changeAuth);
  };

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-buttons-container">
        <button
          onClick={handleChangeAuth}
          className={changeAuth ? "auth-button-active" : "auth-button"}
          disabled={changeAuth}
        >
          Sign In
        </button>
        <button
          onClick={handleChangeAuth}
          className={!changeAuth ? "auth-button-active" : "auth-button"}
          disabled={!changeAuth}
        >
          Sign Up
        </button>
      </div>

      <form action="">
        <input type="text" required />
        <input type="password" required />
        <button>{changeAuth ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};
export default Authorization;
