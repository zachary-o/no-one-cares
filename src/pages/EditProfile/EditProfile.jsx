import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";

import editUser from "../../utils/editUser";

import Navbar from "../../components/Navbar/Navbar";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

import "./styles.css";

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [karma, setKarma] = useState("");
  const [newProfileInfo, setNewProfileInfo] = useState({
    password: "",
    email: "",
  });
  const [authStatus, setAuthStatus] = useState("");
  const [isAuth, setIsAuth] = useState(null);

  const {
    loggedUser,
    setLoggedUser,
    posts,
    localStorageUser,
    setLocalStorageUser,
  } = useContext(Context);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const totalKarma = () => {
      setKarma(
        posts
          .filter((post) => post.author === loggedUser.login)
          .map((post) => Number(post.upvotes))
          .reduce((accumulator, value) => accumulator + value, 0)
      );
    };
    totalKarma();
  }, [loggedUser, posts]);

  const totalKarmaStyles = () => {
    if (karma > 0) {
      return {
        color: "green",
        fontWeight: "bold",
      };
    }
    if (karma < 0) {
      return {
        color: "red",
        fontWeight: "bold",
      };
    } else {
      return {
        color: "black",
        fontWeight: "normal",
      };
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProfileInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveUserInfo = async (event) => {
    event.preventDefault();
    if (editProfile) {
      if (
        newProfileInfo.password.trim() === "" ||
        newProfileInfo.email.trim() === ""
      ) {
        setIsAuth(false);
        setAuthStatus("Please fill all fields");
        setNewProfileInfo({ password: "", email: "" });
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(newProfileInfo.email)) {
        setIsAuth(false);
        setAuthStatus("Invalid email format.");
        return;
      }
      if (newProfileInfo.password.length < 6) {
        setIsAuth(false);
        setAuthStatus("Password must be at least 6 characters");
        return;
      }
      if (newProfileInfo.password && newProfileInfo.email) {
        setIsAuth(null);
        setAuthStatus("");
      }
    }

    try {
      const updatedProfileInfo = {
        password: newProfileInfo.password || loggedUser.password,
        email: newProfileInfo.email || loggedUser.email,
      };

      setNewProfileInfo(updatedProfileInfo);
      setLocalStorageUser({ ...localStorageUser, ...updatedProfileInfo });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...localStorageUser, ...updatedProfileInfo })
      );

      await editUser(loggedUser.id, updatedProfileInfo);
      setIsAuth(true);
      if (editProfile) {
        setAuthStatus("Successfully updated info");
      }
      setEditProfile(!editProfile);

      setLoggedUser({ ...loggedUser, ...updatedProfileInfo });
    } catch (error) {
      console.error("An error occurred while saving user info:", error);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setNewProfileInfo((prevInfo) => ({
      ...prevInfo,
      email: storedEmail || prevInfo.email,
    }));

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setLocalStorageUser(storedUser);
      setNewProfileInfo((prevInfo) => ({
        ...prevInfo,
        password: storedUser.password || prevInfo.password,
        email: storedUser.email || prevInfo.email,
      }));
    }
  }, [setLocalStorageUser]);

  return (
    <div className="wrapper">
      <Navbar />
      {loggedUser ? (
        <div className="users-info">
          <table>
            <tbody>
              <tr>
                <td>Id:</td>
                <td>
                  <input type="text" value={loggedUser.id} readOnly />
                </td>
              </tr>
              <tr>
                <td>Login:</td>
                <td>
                  <input type="text" value={loggedUser.login} readOnly />
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  {editProfile ? (
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newProfileInfo.password}
                      name="password"
                      onChange={(event) => handleInputChange(event)}
                      required
                    />
                  ) : (
                    <div className="password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={loggedUser.password}
                        readOnly={!editProfile}
                      />
                      {showPassword ? (
                        <svg
                          className="show-password"
                          onClick={handleShowPassword}
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          className="show-password"
                          onClick={handleShowPassword}
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 10s3.5 4 10 4 10-4 10-4" />
                          <path d="M4 11.645L2 14" />
                          <path d="M22 14l-1.996-2.352" />
                          <path d="M8.914 13.68L8 16.5" />
                          <path d="M15.063 13.688L16 16.5" />
                        </svg>
                      )}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  {editProfile ? (
                    <input
                      type="email"
                      name="email"
                      value={newProfileInfo.email}
                      onChange={(event) => handleInputChange(event)}
                      required
                    />
                  ) : (
                    <input type="email" value={loggedUser.email} readOnly />
                  )}
                </td>
              </tr>
              <tr>
                <td>Total Posts:</td>
                <td>
                  <input type="text" value={loggedUser.posts} readOnly />
                </td>
              </tr>
              <tr>
                <td>Your Karma:</td>
                <td>
                  <input
                    type="text"
                    value={karma}
                    readOnly
                    style={totalKarmaStyles()}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Loading data...</h1>
      )}
      <h4 style={{ color: isAuth ? "green" : "red" }}>{authStatus}</h4>
      <div className="profile-buttons">
        {loggedUser && posts && (
          <button
            className="edit-user-info-button"
            type={editProfile ? "submit" : ""}
            onClick={(event) => handleSaveUserInfo(event)}
          >
            {editProfile ? "Save" : "Edit profile"}
          </button>
        )}
        <button
          className="delete-profile-button"
          onClick={() => setOpenModal(true)}
        >
          Delete Profile
        </button>
      </div>
      {openModal && <DeleteModal setOpenModal={setOpenModal} title="profile" />}
    </div>
  );
};
export default EditProfile;
