import React from "react";
import "./Home.css";
import Button from "../../components/Button";
import Card from "../../components/Card";
import spaghettiImage from "../../assets/spaghetti-main-bg.jpg";
import image1 from "../../assets/main-image1.png";
import image2 from "../../assets/main-image2.png";
import Footer from "../../components/Footer";

const Home = () => {
  const handleButton = () => {
    console.log("HANDLE BUTTON FROM HERO");
  };

  return (
    <div className="Home">
      <div className="hero">
        <div className="filter">
          <div className="wrapper">
            <h1 className="title">ไม่ว่าจะหยิบหรือไม่หยิบก็ถึงมือเพื่อน</h1>
            <p>บริการรับหิ้วและฝากหิ้วข้าวในกลุ่มเพื่อนๆ</p>
            <Button text="ลองเลย" styleType="primary" action={handleButton} />
          </div>
        </div>
      </div>
      <div className="container">
        <p className="intro">
          กำลังอยากกินหรือหาของอะไรอยู่รึเปล่า:{" "}
          <span className="thirdary-font-clr">ลองฝากเพื่อนหิ้วดูสิ</span>
        </p>
        <div className="grid">
          <Card
            title="FOOD"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus nisi ab quas quis doloremque reprehenderit atque! Iste dicta eaque aliquam?"
          />
          <Card
            title="BEVERAGE"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus nisi ab quas quis doloremque reprehenderit atque! Iste dicta eaque aliquam?"
          />
          <Card
            title="DATE"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus nisi ab quas quis doloremque reprehenderit atque! Iste dicta eaque aliquam?"
          />
        </div>
      </div>
      <div className="center">
        <img className="spaghetti-pic" src={spaghettiImage} alt="spaghetti" />
      </div>
      <div className="container middle">
        <p className="intro center">
          ไม่ว่าอยากได้อะไรหรืออยากกินอะไร.{" "}
          <span className="thirdary-font-clr">
            ถ้าเพื่อนเดินผ่านก็สามารถ
            <br />
            ฝากเพื่อนหิ้วมาให้ได้ผ่านที่นี้
          </span>
        </p>
        <hr />

        <div className="flex start">
          <div className="flex inner start">
            <img className="image1" src={image1} alt="img1" />
            <div className="content">
              <h3 className="title">สามารถฝากเพื่อนหิ้วของมาให้</h3>
              <h3 className="thirdary-font-clr">Lorem ipsum dolor sit amet.</h3>
              <p className="thirdary-font-clr">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis dolor consequatur deserunt unde. Quas porro ducimus vel
                quis. Laborum hic modi voluptatibus ullam labore blanditiis
                velit dolorem fuga in quidem.
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="flex end">
          <div className="flex inner end">
            <img className="image2" src={image2} alt="img2" />
            <div className="content">
              <h3 className="title">สามารถหิ้วของให้เพื่อน</h3>
              <h3 className="thirdary-font-clr">Lorem ipsum dolor sit amet.</h3>
              <p className="thirdary-font-clr">
              การแบ่งปันและช่วยเหลือกันเป็นสิ่งที่ดีและสร้างสรรค์ความสัมพันธ์ที่ดีในกลุ่มเพื่อน 
              ไม่ว่าจะเป็นในสถานที่ต่างๆหรือเวลาใดก็ตาม 
              เราสามารถหิ้วของให้เพื่อนเพื่อเป็นการเสริมสร้างความเข้าใจและความร่วมมือกันได้ 
              ทำให้เรามีช่วงเวลาที่สุขสบายและมีความสุขกับกิจกรรมที่เรากำลังทำด้วยกัน
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
