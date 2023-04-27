import React, { useEffect, useState } from "react";
import "./Deposit.css";
import Button from "../../../components/Button";
import Card from "../components/Card";
import imageURL from "../../../assets/main-image.png";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
const Deposit = ({ user }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!user) navigate("/auth");
  }, []);

  const getMyOrder = async () => {
    try {
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
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyOrder();
  }, [setOrders]);

  const handleFark = async (e) => {
    e.preventDefault();
    const header = e.target.header.value;
    const description = e.target.description.value;
    try {
      const response = await fetch("/food/fark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          header: header,
          description: description,
        }),
      });
      if (response.ok) {
        console.log("SUCCESS FARK");
        console.log(response);
        e.target.header.value = "";
        e.target.description.value = "";
        getMyOrder();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelOrder = async (e) => {
    const id = Number(e.target.id);
    console.log("id", id);
    try {
      const response = await fetch(`/food/cancelfark?OrderID=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await response.text();

      if (response.ok) {
        console.log("SUCCESS CANCEL ORDER");
        getMyOrder();
        return;
      }
      console.log(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Deposit">
      <header>
        <div className="container">
          <div className="grid">
            <div className="panel-left span-2">
              <p>ฝากหิ้ว&ensp;----</p>
              <h1 className="welcome">ยินดีต้อนรับ "{user}"</h1>
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
            {orders?.map((order) => (
              <Card
                key={order.id}
                id={order.id}
                title={order.header}
                desc={order.description}
                status={order.status}
                imageURL={imageURL}
                action={cancelOrder}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deposit;
