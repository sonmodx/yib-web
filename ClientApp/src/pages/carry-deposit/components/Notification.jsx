import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = () => {
  const [lists, setLists] = useState([]);
  console.log(lists);
  useEffect(() => {
    const getLists = async () => {
      try {
        document.body.classList.add("loading");
        const response = await fetch("/notification/getmynoti", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const text = await response.text();
          const data = JSON.parse(text);
          // console.log(typeof data);
          setLists((prevOrders) => {
            if (JSON.stringify(prevOrders) !== JSON.stringify(data)) {
              console.log(prevOrders);
              return data;
            } else {
              return prevOrders;
            }
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        document.body.classList.remove("loading");
      }
    };
    getLists();
  }, []);
  return (
    <div className="Notifi">
      <h1 className="title">แจ้งเตือน</h1>
      <ul className="lists">
        {lists?.map((l) => (
          <li key={l.id}>-{l.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
