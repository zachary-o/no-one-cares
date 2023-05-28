import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Authorization from "./components/Authorization/Authorization";
import HomePage from "./components/HomePage/HomePage";
import CreatePost from "./components/CreatePost/CreatePost";

export const Context = createContext();

function App() {
  const [localStorageUser, setLocalStorageUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setLocalStorageUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  return (
    <Context.Provider value={{ localStorageUser, setLocalStorageUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
