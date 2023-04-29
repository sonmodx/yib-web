import React, { useCallback, useEffect, useState } from "react";
import "./Carry.css";

import { useNavigate } from "react-router-dom";

import CarryOrders from "./CarryOrders";
const Carry = ({ user, username }) => {
  const navigate = useNavigate();
  const [find, setFind] = useState("");
  // const [loading, setLoading] = useState(false);

  const getEveryOrder = async () => {
    try {
      // setLoading(true);
      document.body.classList.add("loading");
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
        // setOrders(data);
        return data;
      }
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
      document.body.classList.remove("loading");
    }
  };

  const filterOrders = useCallback(
    (orders) => {
      const valueLocal = find.trim().toLowerCase();
      // console.log(valueLocal);
      if (valueLocal.length === 0) {
        return orders;
      }
      const newOrders = orders.filter(
        ({ header, description }) =>
          header.toLowerCase().includes(valueLocal) ||
          description.toLowerCase().includes(valueLocal)
      );
      // console.log(newOrders);
      return newOrders;
    },
    [find]
  );

  useEffect(() => {
    if (!user) navigate("/auth");
  }, []);

  return (
    <div className="Carry">
      <header>
        <div className="container">
          <div className="grid">
            <div className="panel-left span-2">
              <p>รับหิ้ว&ensp;----</p>
              <h1 className="welcome">ยินดีต้อนรับ "{username}"</h1>
            </div>
            <div className="filer-box">
              <input
                type="text"
                placeholder="Filter ..."
                onInput={(e) => {
                  setFind(e.target.value);
                  filterOrders();
                }}
              />
            </div>
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
            <CarryOrders
              filterOrders={filterOrders}
              getEveryOrder={getEveryOrder}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carry;
