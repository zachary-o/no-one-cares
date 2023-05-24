import { Routes, Route } from "react-router-dom";
import Authorization from "./components/Authorization";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authorization />} />
      </Routes>
    </div>
  );
}

export default App;
