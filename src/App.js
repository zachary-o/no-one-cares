import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Authorization from "./components/Authorization/Authorization";
import HomePage from "./components/HomePage/HomePage";

export const Context = createContext();

function App() {
  const [localStorageUser, setLocalStorageUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalStorageUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Context.Provider value={{ localStorageUser, setLocalStorageUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
