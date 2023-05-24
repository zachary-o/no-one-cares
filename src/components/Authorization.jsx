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
  const [isAuth, setIsAuth] = useState(null);
  const [authStatus, setAuthStatus] = useState("");

  const handleChangeAuth = () => {
    setChangeAuth(!changeAuth);
    setFormData({ login: "", password: "" });
    setAuthStatus("");
  };

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const newUser = async () => {
    const user = await registerUser(formData);
  };

  const handlesaveUser = () => {
    localStorage.setItem("user", JSON.stringify(formData));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setFormData(JSON.parse(storedUser));
    }
  }, []);

  console.log(formData, authStatus);

  const validateFormData = (event) => {
    event.preventDefault();
    if (changeAuth) {
      if (formData.login === "" || formData.password === "") {
        setIsAuth(false);
        setAuthStatus("Please fill all fields");

        return;
      }
      if (
        users.find((user) => user.login === formData.login) &&
        users.find((user) => user.password === formData.password)
      ) {
        setIsAuth(true);
        setAuthStatus("Login success");
        handlesaveUser();
        return;
      }
      if (
        users.find((user) => user.login !== formData.login) ||
        users.find((user) => user.password !== formData.password)
      ) {
        setIsAuth(false);
        setAuthStatus("Incorrect login or password");
        return;
      }
    }

    if (!changeAuth) {
      if (formData.login === "" || formData.password === "") {
        setIsAuth(false);
        setAuthStatus("Please enter credentials");
        return;
      }
      if (users.find((user) => user.login !== formData.login)) {
        newUser();
        setIsAuth(true);
        setAuthStatus("User created");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      {formData.login && <p>Welcome, {formData.login}</p>}
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
        <h4 style={{ color: isAuth ? "green" : "red" }}>{authStatus}</h4>
        <button onClick={(event) => validateFormData(event)}>
          {changeAuth ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};
export default Authorization;
