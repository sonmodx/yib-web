import React, { useEffect, useRef, useState } from "react";
import "./Carry.css";
import Card from "../components/Card";
import imageURL from "../../../assets/carry.png";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
const Carry = ({ user }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, []);

  const getEveryOrder = async () => {
    try {
      const response = await fetch("/food/geteveryorder", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        // console.log(typeof data);
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOrder = async (id, status) => {
    console.log("before status", status);

    const newStatus = Number(status) == 0 ? 1 : 0;
    console.log("after status", newStatus);
    console.log(id);
    try {
      const response = await fetch(
        `/food/updateorder?OrderID=${id}&Status=${newStatus}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const text = await response.text();

      if (response.ok) {
        console.log("SUCCESS CHANGE STATE");
        getEveryOrder();
        return;
      }
      console.log(text);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEveryOrder();
  }, [setOrders]);

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
            {orders?.map((order) => (
              <Card
                key={order.id}
                id={order.id}
                title={order.header}
                desc={order.description}
                status={order.status}
                imageURL={imageURL}
                action={() => handleUpdateOrder(order.id, order.status)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carry;
