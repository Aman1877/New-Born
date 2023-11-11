import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
