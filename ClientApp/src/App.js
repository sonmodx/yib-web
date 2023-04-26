import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home/Home";
import Carry from "./pages/carry-deposit/carry/Carry";
import Deposit from "./pages/carry-deposit/deposit/Deposit";
import About from "./pages/about/About";
import Auth from "./pages/auth/Auth";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    if (localStorage.getItem("dark-mode") === "actived") {
      document.body.classList.add("dark-mode");
    }
  }, []);
  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Home />} />
        <Route path="/carry" element={<Carry user={user} />} />
        <Route path="/deposit" element={<Deposit user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </div>
  );
};

export default App;
