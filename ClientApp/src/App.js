import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home/Home";
import Carry from "./pages/carry-deposit/carry/Carry";
import Deposit from "./pages/carry-deposit/deposit/Deposit";
import About from "./pages/about/About";
import Auth from "./pages/auth/Auth";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(Cookies.get("UserID"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  console.log(Cookies.get("UserID"));
  useEffect(() => {
    if (localStorage.getItem("dark-mode") === "actived") {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const styleNotFound = {
    color: "var(--primary-font-clr)",
    textAlign: "center",
    paddingTop: "20rem",
  };
  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Home />} />
        <Route
          path="/carry"
          element={<Carry user={user} username={username} />}
        />
        <Route
          path="/deposit"
          element={<Deposit user={user} username={username} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/auth"
          element={<Auth setUser={setUser} setUsername={setUsername} />}
        />
        <Route
          path="/*"
          element={<h1 style={styleNotFound}>404 NOT FOUND</h1>}
        />
      </Routes>
    </div>
  );
};

export default App;
