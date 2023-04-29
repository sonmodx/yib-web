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
    </div>
  );
};

export default Deposit;
