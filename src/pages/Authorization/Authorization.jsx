import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import registerUser from "../../utils/registerUser";
import resetPosts from "../../utils/resetPosts";

import "./styles.css";
import logo from "../../assets/icons/logo.svg";

const Authorization = () => {
  const [changeAuth, setChangeAuth] = useState(true);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(null);
  const [authStatus, setAuthStatus] = useState("");

  const { setLocalStorageUser, users } = useContext(Context);
  const navigate = useNavigate();

  const handleChangeAuth = () => {
    setChangeAuth(!changeAuth);
    setFormData({ login: "", password: "" });
    setAuthStatus("");
  };

  const newUser = async () => {
    try {
      const user = await registerUser(formData);
      await resetPosts(user.id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const handleSaveUser = () => {
    localStorage.setItem("user", JSON.stringify(formData));
  };

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
        handleSaveUser();
        setLocalStorageUser(formData);
        navigate("/");
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
      if (formData.login.trim() === "" || formData.password.trim() === "") {
        setIsAuth(false);
        setAuthStatus("Please enter credentials");
        return;
      }
      if (users.find((user) => user.login === formData.login)) {
        setIsAuth(false);
        setAuthStatus("User already exists");
        return;
      }
      if (formData.login.length < 6) {
        setIsAuth(false);
        setAuthStatus("Login must be at least 6 characters");
        return;
      }
      if (formData.password.length < 6) {
        setIsAuth(false);
        setAuthStatus("Password must be at least 6 characters");
        return;
      }
      newUser()
        .then((user) => {
          setIsAuth(true);
          setAuthStatus("User created");
          handleSaveUser();
        })
        .catch((error) => {
          setIsAuth(false);
          setAuthStatus("Registration failed");
          console.log(error);
        })
        .finally(() => navigate("/"));
    }
  };

  return (
    <div className="auth">
      <div className="logo-container">
        <img src={logo} alt="" className="auth-logo" />
      </div>
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
          <h4 style={{ color: isAuth ? "green" : "red" }}>{authStatus}</h4>
          <button onClick={(event) => validateFormData(event)}>
            {changeAuth ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Authorization;
