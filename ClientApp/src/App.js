import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/NavBar";
import "./App.css";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("dark-mode") === "actived") {
      document.body.classList.add("dark-mode");
    }
  }, []);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </div>
  );
};

export default App;
