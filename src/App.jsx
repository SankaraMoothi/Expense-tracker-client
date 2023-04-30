import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Register from "./Page/Register";

import Portal from "./Page/Portal";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
