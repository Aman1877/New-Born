import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import HomePage from "./pages/HomePage";
import NewSubmit from "./pages/Auth/NewSubmit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/otp" element={<NewSubmit />} />
      </Routes>
    </>
  );
}

export default App;
