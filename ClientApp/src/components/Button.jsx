import React from "react";
import "./Button.css";

const Button = ({ id, text, styleType, action, type, color }) => {
  return (
    <div className="Button">
      <button
        id={id}
        type={type}
        className={`${color} ${styleType}`}
        onClick={action}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
