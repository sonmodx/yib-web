import React, { useEffect } from "react";
import "./Carry.css";
import Card from "../components/Card";
import imageURL from "../../../assets/carry.png";
import Notification from "../components/Notification";
const Carry = ({ user }) => {
  return (
    <div className="Carry">
      <header>
        <div className="container">
          <div className="grid">
            <div className="panel-left span-2">
              <p>รับหิ้ว&ensp;----</p>
              <h1 className="welcome">ยินดีต้อนรับ "{user}"</h1>
            </div>
            <Notification />
          </div>
        </div>
      </header>
      <section>
        <div className="container">
          <h1 className="sub-title">
            รายการรับซื้อของฉัน.
            <span className="sub-text">
              ลองดูสิว่าผ่านทางนั้นไหม ถ้าผ่านซื้อให้เพื่อนด้วยก็ดีนะ^^
            </span>
          </h1>
          <div className="grid">
            <Card
              title="ข้าวกล่อง"
              desc="ฝากซื้อน้ำที่โรงอาหาร ขวดละ 7 บาท อยู่ ECC 801"
              textBtn="ยกเลิก"
              colorBtn="red"
              imageURL={imageURL}
            />
            <Card
              title="ข้าวกล่อง"
              desc="ฝากซื้อน้ำที่โรงอาหาร ขวดละ 7 บาท อยู่ ECC 801"
              textBtn="รับ"
              colorBtn="green"
              imageURL={imageURL}
            />
            <Card
              title="ข้าวกล่อง"
              desc="ฝากซื้อน้ำที่โรงอาหาร ขวดละ 7 บาท อยู่ ECC 801"
              textBtn="รับ"
              colorBtn="green"
              imageURL={imageURL}
            />
            <Card
              title="ข้าวกล่อง"
              desc="ฝากซื้อน้ำที่โรงอาหาร ขวดละ 7 บาท อยู่ ECC 801"
              textBtn="รับ"
              colorBtn="green"
              imageURL={imageURL}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carry;
