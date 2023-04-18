import React from "react";
import Button from "../../../components/Button";
import "./Card.css";
const Card = ({ title, desc, textBtn, colorBtn, imageURL }) => {
  return (
    <div className="Card">
      <img src={imageURL} alt="card" />
      <p className="title">{title}</p>
      <p className="description">{desc}</p>
      <div className="right">
        <Button
          text={textBtn}
          styleType="primary"
          type="button"
          color={colorBtn}
        />
      </div>
    </div>
  );
};

export default Card;
