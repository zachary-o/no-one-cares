import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import getPosts from "./utils/getPosts";
import getUsers from "./utils/getUsers";

import Authorization from "./components/Authorization/Authorization";
import HomePage from "./components/HomePage/HomePage";
import CreatePost from "./components/CreatePost/CreatePost";
import UserPage from "./components/UserPage/UserPage";
import AllPosts from "./components/AllPosts/AllPosts";

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
  }, [users]);

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
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/all-posts" element={<AllPosts />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
