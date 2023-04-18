import React from "react";
import "./Footer.css";
import logoImage from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="grid">
        <div className="company center">
          <Link to="/main">
            <img src={logoImage} alt="logo" />
          </Link>
          <p className="thirdary-font-clr">
            &copy; 2023 หยิบ Inc, All rights reserved.
          </p>
        </div>
        <div className="summary grid">
          <Link className="link" to="/main">
            หน้าหลัก
          </Link>
          <Link className="link left" to="/about">
            เกี่ยวกับ
          </Link>
          <Link className="link span2" to="/carry">
            รับหิ้ว
          </Link>
          <Link className="link" to="/deposit">
            ฝากหิ้ว
          </Link>
        </div>
        <div className="icon-link flex">
          <Link className="link" to="/main">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link className="link" to="/main">
            <i className="fa-brands fa-twitter"></i>
          </Link>
          <Link className="link" to="/main">
            <i className="fa-brands fa-instagram"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
