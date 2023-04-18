import React from "react";
import "./Deposit.css";
import Button from "../../../components/Button";
import Card from "../components/Card";
import imageURL from "../../../assets/main-image.png";
import Notification from "../components/Notification";
const Deposit = () => {
  return (
    <div className="Deposit">
      <header>
        <div className="container">
          <div className="grid">
            <div className="panel-left span-2">
              <p>ฝากหิ้ว&ensp;----</p>
              <h1 className="welcome">ยินดีต้อนรับ "XDOM"</h1>
              <form action="#" className="box">
                <textarea
                  name="deposit-item"
                  cols="70"
                  rows="5"
                  placeholder="อยากฝากเพื่อนซื้ออะไรดี..."
                ></textarea>
                <div className="right">
                  <Button text="ส่ง" styleType="primary" type="submit" />
                </div>
              </form>
            </div>

            <Notification />
          </div>
        </div>
      </header>
      <section>
        <div className="container">
          <h1 className="sub-title">
            รายการฝากซื้อของฉัน.
            <span className="sub-text">
              ถ้าเพื่อนผ่านแถวนั้นก็อาจจะรับหิ้วให้ได้นะ
            </span>
          </h1>
          <div className="grid">
            <Card
              title="น้ำ"
              desc="ฝากซื้อน้ำที่โรงอาหาร ขวดละ 7 บาท อยู่ ECC 801"
              textBtn="ยกเลิก"
              colorBtn="red"
              imageURL={imageURL}
            />
            <Card
              title="น้ำ"
              desc="ฝากซื้อน้ำที่โรงอาหาร ขวดละ 7 บาท อยู่ ECC 801"
              textBtn="สำเร็จ"
              colorBtn="green"
              imageURL={imageURL}
            />
            <Card
              title="น้ำ"
              desc="ฝากซื้อน้ำที่โรงอาหาร ขวดละ 7 บาท อยู่ ECC 801"
              textBtn="กำลังมา"
              colorBtn="orange"
              imageURL={imageURL}
            />
            <Card
              title="น้ำ"
              desc="ฝากซื้อน้ำที่โรงอาหาร ขวดละ 7 บาท อยู่ ECC 801"
              textBtn="สำเร็จ"
              colorBtn="green"
              imageURL={imageURL}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deposit;
