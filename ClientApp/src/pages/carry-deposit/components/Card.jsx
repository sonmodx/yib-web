import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import "./Card.css";
const Card = ({ id, title, desc, status, imageURL, action, actionSuccess }) => {
  const [textBtn, setTextBtn] = useState();
  const [colorBtn, setColorBtn] = useState();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/deposit") {
      switch (status) {
        case 0:
          setTextBtn("ยกเลิก");
          setColorBtn("red");
          break;
        case 1:
          setTextBtn("กำลังมา");
          setColorBtn("orange");
          break;
        case 2:
          setTextBtn("สำเร็จ");
          setColorBtn("green");
          break;
      }
    } else {
      switch (status) {
        case 0:
          setTextBtn("รับ");
          setColorBtn("green");
          break;
        // case 2:
        //   setTextBtn("กำลังส่ง");
        //   setColorBtn("orange");
        //   break;
        case 1:
          setTextBtn("ยกเลิก");
          setColorBtn("red");
          break;
      }
    }
  }, [textBtn, colorBtn, status]);

  return (
    <div className="Card">
      <img src={imageURL} alt="card" />
      <p className="title">{title}</p>
      <p className="description">{desc}</p>
      <div className="right">
        <div className="group">
          <Button
            id={id}
            text={textBtn}
            styleType="primary"
            type="button"
            color={colorBtn}
            action={action}
          />
          {status === 1 && location.pathname === "/deposit" && (
            <button
              className="success-btn"
              onClick={actionSuccess}
              title="ได้รับแล้ว"
            >
              <i className="fa-solid fa-check"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
