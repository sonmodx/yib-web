import React from "react";
import "./Notification.css";

const Notification = () => {
  return (
    <div className="Notifi">
      <h1 className="title">แจ้งเตือน</h1>
      <ul className="lists">
        <li>มีคนรับน้ำไปให้แล้ว</li>
        <li>....</li>
        <li>....</li>
        <li>....</li>
      </ul>
    </div>
  );
};

export default Notification;
