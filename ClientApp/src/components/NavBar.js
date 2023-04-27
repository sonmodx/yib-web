import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import "./NavBar.css";

const NavBar = ({ user, setUser }) => {
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const checkClick = useRef(null);
  const checkClickTheme = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/main" || window.scrollY > 0) {
      document.querySelector(".Navbar").classList.add("move");
    } else {
      document.querySelector(".Navbar").classList.remove("move");
    }
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (!checkClick.current.contains(event.target) &&
          !event.target.classList.contains("menu-btn")) ||
        event.target.classList.contains("link")
      ) {
        setIsButtonOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkClick]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!checkClickTheme.current.contains(event.target)) {
        const dropBtn = document.querySelector(".dropbtn");
        dropBtn.classList.remove("open");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkClickTheme]);

  useEffect(() => {
    if (localStorage.getItem("dark-mode") === "actived") {
      selectDarkMode();
    }
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 500) {
      setIsButtonOpen(false);
    }
  });

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".Navbar");
    if (window.scrollY > 0 || location.pathname !== "/main") {
      navbar.classList.add("move");
    } else {
      navbar.classList.remove("move");
    }
  });

  const handleLogout = async () => {
    try {
      document.body.classList.add("loading");
      const res = await fetch("/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await res.text();

      if (!res.ok) {
        console.log(text);
        return;
      }
      localStorage.removeItem("user");
      setUser("");
      navigate("/auth");
      console.log(text);
    } catch (err) {
      console.error(err);
    } finally {
      document.body.classList.remove("loading");
    }
  };

  function handleThemeBtn() {
    const dropBtn = document.querySelector(".dropbtn");
    dropBtn.classList.toggle("open");
  }

  function selectDarkMode() {
    const dropBtnSign = document.querySelector(".dropbtn-sign");
    dropBtnSign?.classList.add("fa-moon");
    dropBtnSign?.classList.remove("fa-sun");
    localStorage.setItem("dark-mode", "actived");
    document.body.classList.add("dark-mode");
  }

  function selectLightMode() {
    const dropBtnSign = document.querySelector(".dropbtn-sign");
    dropBtnSign?.classList.add("fa-sun");
    dropBtnSign?.classList.remove("fa-moon");
    localStorage.setItem("dark-mode", null);
    document.body.classList.remove("dark-mode");
  }

  return (
    <div className={location.pathname !== "/auth" ? "Navbar" : "Navbar hide"}>
      <div className="container">
        <div className="wrapper">
          <div className="logo-image">
            <Link className="link" to="/main">
              <img src={logoImage} alt="logo" />
            </Link>
          </div>
          <ul
            className={isButtonOpen ? "menu-list open" : "menu-list"}
            ref={checkClick}
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
                to="/main"
              >
                หน้าหลัก
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
                to="/deposit"
              >
                ฝากซื้อ
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
                to="/carry"
              >
                รับซื้อ
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
                to="/about"
              >
                เกี่ยวกับ
              </NavLink>
            </li>

            {!user ? (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "link-active" : "link"
                  }
                  to="/auth"
                >
                  เข้าสู่ระบบ
                </NavLink>
              </li>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>
                ออกจากระบบ
              </button>
            )}
          </ul>
          <div className="dropdown" ref={checkClickTheme}>
            <div className="dropbtn" onClick={handleThemeBtn}>
              <i className="dropbtn-sign fa-solid fa-sun"></i>
            </div>
            <div className="dropdown-content">
              <div className="group" onClick={selectDarkMode}>
                <i
                  className="fa-solid fa-moon"
                  aria-label="dark mode theme"
                ></i>
                DARK
              </div>
              <div className="group" onClick={selectLightMode}>
                <i className="fa-solid fa-sun"></i>
                LIGHT
              </div>
            </div>
          </div>
          {isButtonOpen ? (
            <i
              className="menu-btn fa-solid fa-x"
              onClick={() => setIsButtonOpen((prev) => !prev)}
            ></i>
          ) : (
            <i
              className="menu-btn fa-solid fa-bars"
              onClick={() => setIsButtonOpen((prev) => !prev)}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
