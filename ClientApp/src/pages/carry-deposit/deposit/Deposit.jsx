import React, { useEffect, useRef, useState } from "react";
import "./Deposit.css";
import Button from "../../../components/Button";

import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import "./dropDown.css";

import ShowOrders from "./ShowOrders";
const Deposit = ({ user, username }) => {
  const navigate = useNavigate();
  const [header, setHeader] = useState("");
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

  const shops = [
    {
      name: "ร้านเทคโนอินเตอร์",
      menus: [
        "ชุดอาหารเช้า",
        "ไข่กะทะทรงเครื่อง",
        "ครีมซุปเห็ด ครีมซุปไก่",
        "สลัดเทคโน ไก่ทอด ไก่ย่าง หมูทอด ปลาทอด",
        "สเต็กอกไก่ ไก่สไปซี่ สันคอหมู เนื้อโคขุน",
        "ข้าวไก่ย่างเทริยากิ",
        "ข้าวยำไก่ย่าง",
        "ข้าวไก่ชีส",
        "ข้าวไก่แพนง ไก่ทอดเขียวหวาน",
        "ข้าวไก่ทอดเทคโน",
        "ข้าวไก่คาราเกะ",
        "ไก่ทอดกระเพรา",
        "ข้าวหมูสไปซี่",
        "ข้าวหมูกะทะผัดไข่",
        "ข้าวหมูทอดแกงกะหรี่",
        "หมูทอดทงคัตสึ",
        "หมูทอดขอสแฮม",
        "ข้าวเบคอนไข่กะทะ",
      ],
    },
    {
      name: "ร้านอินดรีส indris",
      menus: [
        "ข้าวราดแกง 1 อย่าง",
        "ข้าวราดแกง 2 อย่าง",
        "กับข้าว (ถุง)",
        "ผัดกะเพรา",
        "ผัดพริกแกง",
        "ผัดน้ำมันหอย",
        "ข้าวผัดขี้เมาทะเล",
        "ไข่เจียว",
        "ผัดซีอิ๊ว",
        "ข้าวผัด",
        "ข้าวผัดต้มยำ",
        "ไข่ดาว",
        "ข้าวเปล่า",
      ],
    },
    {
      name: "ร้านไอเย็น i-yen",
      menus: [
        "น้ำแข็งใส/เต้าทึง",
        "รวมมิตร/ลอดช่องสิงคโปร์",
        "เฉาก๊วยนมสด",
        "ขนมหวาน/ขนมไทย",
        "ลูกชิ้นทอด/นักเก็ต/ปอเปี๊ยะ",
        "ผลไม้ตามฤดูกาล",
        "ขนมขบเคี้ยว",
        "เบเกอรี่",
      ],
    },
    {
      name: "ร้านพี่ฝน กาแฟสด&น้ำปั่น",
      menus: [
        "กาแฟสด,ชา ร้อน/เย็น/ปั่น",
        "ชาไต้หวันไข่มุก",
        "นมสด ร้อน/เย็น/ปั่น",
        "น้ำสมุนไพร, น้ำหวาน",
        "น้ำเปล่า,น้ำอดลม,นมกลอง",
        "เอสเพรสโซ",
        "คาปูชิโน",
        "ลาเต้",
        "ชาเขียวนม",
        "มอคค่า",
        "ชานม",
      ],
    },
  ];

  const [selectShop, setSelectShop] = useState("รายการร้านอาหาร");

  const findShop = () => {
    const [newShop] = shops.filter((shop) => shop.name === selectShop);
    console.log(newShop);
    return newShop;
  };

  const handleSelectGuideMenu = (menu, e) => {
    const newMenu = menu;
    const item = e.target;
    item.classList.add("add-item");
    console.log("start");
    setTimeout(() => {
      item.classList.remove("add-item");
    }, 500);

    console.log("end");
    console.log(item);
    console.log("newMenu", newMenu);
    if (header === "") {
      setHeader(newMenu);
      return;
    }
    setHeader((prev) => prev + ", " + newMenu);
  };

  return (
    <div className="Deposit">
      <header>
        <div className="container">
          <div className="grid">
            <div className="panel-left span-2">
              <p>ฝากหิ้ว&ensp;----</p>
              <h1 className="welcome">ยินดีต้อนรับ "{username}"</h1>

              <div className="dropdown">
                <input type="checkbox" id="dropdown" />

                <label className="dropdown__face" htmlFor="dropdown">
                  <div className="dropdown__text">{selectShop}</div>
                  {selectShop === "รายการร้านอาหาร" ? (
                    <div className="dropdown__arrow"></div>
                  ) : (
                    <i
                      className="dropdown__exit fa-solid fa-x"
                      onClick={() => setSelectShop("รายการร้านอาหาร")}
                    ></i>
                  )}
                </label>

                <ul className="dropdown__items">
                  {selectShop === "รายการร้านอาหาร"
                    ? shops?.map((shop, idx) => (
                        <li
                          key={idx}
                          className="item__lists"
                          onClick={() => {
                            setSelectShop(shop.name);
                          }}
                        >
                          {shop.name}
                        </li>
                      ))
                    : findShop()?.menus?.map((menu, idx) => (
                        <li
                          key={idx}
                          className="item__lists menu"
                          onClick={(e) => handleSelectGuideMenu(menu, e)}
                        >
                          {menu}
                        </li>
                      ))}
                </ul>
              </div>

              <form className="form" onSubmit={handleFark}>
                <input
                  type="text"
                  name="header"
                  placeholder="ฝากเพื่อนซื้อไรดี..."
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
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
    </div>
  );
};

export default Deposit;
