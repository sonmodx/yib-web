import React from "react";
import "./Card.css";
import image from "../assets/main-image.png";
const Card = ({ title, description }) => {
  return (
    <div className="Card">
      <img src={image} alt="main" />
      <p className="title">{title}</p>
      <p className="description">{description}</p>
    </div>
  );
};

export default Card;
