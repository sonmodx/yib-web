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
            description='อาหารเป็นสิ่งจำเป็นต่อชีวิตของมนุษย์ เพื่อให้ร่างกายได้รับพลังงานและสารอาหารที่จำเป็นสำหรับการเจริญเติบโตและดำรงชีวิต การบริโภคอาหารที่ถูกต้องมีผลต่อสุขภาพร่างกายและจิตใจของเราอย่างมาก ดังนั้นเราควรรู้จักและปฏิบัติตามหลักโภชนาการที่ถูกต้อง'
          />
          <Card
            title="BEVERAGE"
            description="เครื่องดื่มคือผลิตภัณฑ์ที่ใช้ในการดื่ม เช่น น้ำ, ชา, กาแฟ, น้ำผลไม้, น้ำส้ม, เบียร์, ไวน์, โซดา, น้ำอัดลม ฯลฯ การดื่มเครื่องดื่มเป็นสิ่งที่มนุษย์ทำมาตั้งแต่อดีตโบราณ และเครื่องดื่มมีบทบาทสำคัญในการสร้างความสุขและความอร่อยในชีวิตประจำวันของเรา"
          />
          <Card
            title="DATE"
            description="การมาตรงเวลาเป็นสิ่งสำคัญในการดำเนินชีวิตทั้งในด้านการทำงานและการปฏิบัติต่างๆ เพราะมันช่วยเพิ่มประสิทธิภาพในการทำงานและสร้างความเชื่อมั่นในตัวเราเอง การมาไม่ตรงเวลาอาจส่งผลให้เราสูญเสียโอกาสหรือขาดความสำคัญในสิ่งที่ต้องทำ"
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
              <h3 className="thirdary-font-clr">เมื่อเราหิวหรืออยากได้อะไร</h3>
              <p className="thirdary-font-clr">
              เมื่อร่างกายของเรารู้สึกหิวหรืออยากได้อะไร 
              มันจะส่งสัญญาณไปยังสมองของเราว่าต้องการอาหารหรือเครื่องดื่มบางอย่าง 
              เพื่อให้ร่างกายได้รับพลังงานและสารอาหารที่จำเป็นสำหรับการทำงานและดำรงชีวิตในระยะยาว 
              ดังนั้นเราควรรับประทานอาหารที่ถูกต้องและไม่เกินจำเป็นเพื่อรักษาสุขภาพร่างกายของเราไว้ในสภาพที่ดี
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
              <h3 className="thirdary-font-clr">ไม่ว่าจะที่ไหนหรือเมื่อไหร่เราก็สามารถหิ้วของให้เพื่อนได้เสมอ</h3>
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
