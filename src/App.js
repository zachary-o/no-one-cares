import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import getPosts from "./utils/getPosts";
import getUsers from "./utils/getUsers";

import Authorization from "./pages/Authorization/Authorization";
import HomePage from "./pages/HomePage/HomePage";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditProfile from "./pages/EditProfile/EditProfile";
import AllPosts from "./pages/AllPosts/AllPosts";
import UserPage from "./pages/UserPage/UserPage";

export const Context = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [localStorageUser, setLocalStorageUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setLocalStorageUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      const usersPosts = posts
        .filter((user) => user.author === localStorageUser.login)
        .reverse();
      setPosts(usersPosts);
    };
    fetchPosts();
  }, [localStorageUser]);

  useEffect(() => {
    setLoggedUser(users.find((user) => user.login === localStorageUser.login));
  }, [users, localStorageUser]);

  return (
    <Context.Provider
      value={{
        localStorageUser,
        setLocalStorageUser,
        posts,
        setPosts,
        users,
        setUsers,
        loggedUser,
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
