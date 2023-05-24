import { useEffect, useState } from "react";

import getUsers from "../utils/getUsers";
import registerUser from "../utils/registerUser";

const Authorization = () => {
  const [changeAuth, setChangeAuth] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [authStatus, setAuthStatus] = useState("");

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

  console.log(formData);

  const validateFormData = (event) => {
    event.preventDefault();
    if (changeAuth) {
      if (formData.login === "" || formData.password === "") {
        setAuthStatus("Please enter credentials");
      }
      if (
        users.find((user) => user.login === formData.login) &&
        users.find((user) => user.password === formData.password)
      ) {
        setAuthStatus("Login success");
      }
      if (
        users.find((user) => user.login !== formData.login) ||
        users.find((user) => user.password !== formData.password)
      ) {
        setAuthStatus("Incorrect login or password");
      }
    }
  };

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
        <input
          type="text"
          name="login"
          placeholder="Login"
          required
          value={formData.login}
          onChange={(event) =>
            setFormData({ ...formData, login: event.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
        <h4>{authStatus}</h4>
        <button onClick={(event) => validateFormData(event)}>
          {changeAuth ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};
export default Authorization;
