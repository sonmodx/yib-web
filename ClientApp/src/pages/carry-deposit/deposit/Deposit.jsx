import React, { useEffect, useState } from "react";
import "./Deposit.css";
import Button from "../../../components/Button";

import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";

import ShowOrders from "./ShowOrders";
const Deposit = ({ user, username }) => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  console.log("PARENT");
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  const getMyOrder = async () => {
    try {
      // setLoading(true);
      document.body.classList.add("loading");
      const response = await fetch("/food/getmyorder", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        // console.log(typeof data);
        return data;
      }
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
      document.body.classList.remove("loading");
    }
  };

  const handleFark = async (e) => {
    e.preventDefault();
    const { header, description } = e.target;
    try {
      document.body.classList.add("loading");
      const response = await fetch("/food/fark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          header: header.value,
          description: description.value,
        }),
      });
      if (response.ok) {
        console.log("SUCCESS FARK");
        e.target.header.value = "";
        e.target.description.value = "";
        await getMyOrder();
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      document.body.classList.remove("loading");
    }
  };

  const shop = [
    {
      name:"ร้านเทคโนอินเตอร์" ,
      menus: ["ชุดอาหารเช้า","ไข่กะทะทรงเครื่อง","ครีมซุปเห็ด ครีมซุปไก่","สลัดเทคโน ไก่ทอด ไก่ย่าง หมูทอด ปลาทอด",
      "สเต็กอกไก่ ไก่สไปซี่ สันคอหมู เนื้อโคขุน",'ข้าวไก่ย่างเทริยากิ' ,'ข้าวยำไก่ย่าง','ข้าวไก่ชีส','ข้าวไก่แพนง ไก่ทอดเขียวหวาน','ข้าวไก่ทอดเทคโน',
      'ข้าวไก่คาราเกะ','ไก่ทอดกระเพรา','ข้าวหมูสไปซี่', 'ข้าวหมูกะทะผัดไข่','ข้าวหมูทอดแกงกะหรี่', 'หมูทอดทงคัตสึ' ,'หมูทอดขอสแฮม',
      'ข้าวเบคอนไข่กะทะ'
      ],
    },
    {
      name:"ร้านอินดรีส indris" ,
      menus: [ 'ข้าวราดแกง 1 อย่าง','ข้าวราดแกง 2 อย่าง','กับข้าว (ถุง)','ผัดกะเพรา','ผัดพริกแกง','ผัดน้ำมันหอย','ข้าวผัดขี้เมาทะเล',
      'ไข่เจียว','ผัดซีอิ๊ว','ข้าวผัด','ข้าวผัดต้มยำ','ไข่ดาว','ข้าวเปล่า'
      ],
    }, 
    {
      name:"ร้านไอเย็น i-yen" ,
      menus: ['น้ำแข็งใส/เต้าทึง','รวมมิตร/ลอดช่องสิงคโปร์','เฉาก๊วยนมสด','ขนมหวาน/ขนมไทย','ลูกชิ้นทอด/นักเก็ต/ปอเปี๊ยะ',
      'ผลไม้ตามฤดูกาล','ขนมขบเคี้ยว','เบเกอรี่'
      ],
    },
    {
      name:"ร้านพี่ฝน กาแฟสด&น้ำปั่น" ,
      menus: ['กาแฟสด,ชา ร้อน/เย็น/ปั่น','ชาไต้หวันไข่มุก','นมสด ร้อน/เย็น/ปั่น','น้ำสมุนไพร, น้ำหวาน','น้ำเปล่า,น้ำอดลม,นมกลอง','เอสเพรสโซ' , 
      'คาปูชิโน','ลาเต้','ชาเขียวนม','มอคค่า','ชานม'],
    }

  ]

  const [name,setName] = useState([]);
  const [menu,setMenu] = useState([]);
  const [menus,setMenus] = useState([]);
   
 
  const changeName = (event) => {
    setName(event.target.value);
    setMenus(shop.find(ctr => ctr.name === event.target.value).menus);
  };
  function changeMenu(event){
    setMenu(event.target.value);  
  }

  return (
    <div className="Deposit">
      <header>
        <div className="container">
          <div className="grid">
            <div className="panel-left span-2">
              <p>ฝากหิ้ว&ensp;----</p>
              <h1 className="welcome">ยินดีต้อนรับ "{username}"</h1>
              <form className="form" onSubmit={handleFark}>
                <input
                  type="text"
                  name="header"
                  placeholder="ฝากเพื่อนซื้อไรดี..."
                  required
                />
                <hr />
                <textarea
                  name="description"
                  cols="70"
                  rows="5"
                  placeholder="รายละเอียดเพิ่มเติม..."
                  required
                />
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
            <ShowOrders getMyOrder={getMyOrder} />
          </div>
        </div>
      </section>
      <div className="choosemenu">
        <h1 className="sub-title">
            รายการอาหารแนะนำ
          </h1>
        <select className="control" value={name} onChange={changeName}>
          <option>เลือกร้านค้า</option>
          {shop.map(ctr => (
            <option value={ctr.name}>{ctr.name}</option>
          ))}
        </select>
        <br/>
        <select className="control_menu" value={menu} onChange={changeMenu}>
         <option>เลือกเมนูที่ต้องการ</option>
          {menus.map(menu => (
            <option value={menu}>{menu}</option>
          ))}
        <br/>
        </select>
      </div>
      <div className="menucard">
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      <Card
        title="ชุดอาหารเช้า"
        desc="american Breakfast"
        textBtn="45"
        colorBtn="gray"
        imageURL={imageURL}
      />
      
      </div>
    </div>
  );
};

export default Deposit;
