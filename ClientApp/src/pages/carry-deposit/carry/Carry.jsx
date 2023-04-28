import React, { useCallback, useEffect, useState } from "react";
import "./Carry.css";
import Card from "../components/Card";
import imageURL from "../../../assets/carry.png";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
const Carry = ({ user, username }) => {
  const navigate = useNavigate();
  const [find, setFind] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, []);

  const getEveryOrder = async () => {
    try {
      setLoading(true);
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
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      document.body.classList.remove("loading");
    }
  };

  const handleUpdateOrder = async (id, status) => {
    console.log("before status", status);

    const newStatus = Number(status) == 0 ? 1 : 0;
    console.log("after status", newStatus);
    console.log("id", id);
    try {
      document.body.classList.add("loading");
      const [updateResponse, notiResponse] = await Promise.all([
        fetch(`/food/updateorder?OrderID=${id}&Status=${newStatus}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        fetch(`/notification/createnoti?OrderID=${id}&Status=${newStatus}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);
      const textUpdate = await updateResponse.text();
      const textNoti = await notiResponse.text();

      if (updateResponse.ok && notiResponse.ok) {
        console.log("SUCCESS CHANGE STATE AND CREATE NOTI");
        getEveryOrder();
        return;
      }
      console.log(textUpdate);
      console.log(textNoti);
    } catch (err) {
      console.error(err);
    } finally {
      document.body.classList.remove("loading");
    }
  };

  useEffect(() => {
    getEveryOrder();
  }, [setOrders]);

  const filterOrders = useCallback(() => {
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
  }, [find, orders]);

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
            {loading ? (
              <Loading />
            ) : (
              filterOrders()?.map((order) => (
                <Card
                  key={order.id}
                  id={order.id}
                  title={order.header}
                  desc={order.description}
                  status={order.status}
                  imageURL={imageURL}
                  action={() => handleUpdateOrder(order.id, order.status)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carry;
