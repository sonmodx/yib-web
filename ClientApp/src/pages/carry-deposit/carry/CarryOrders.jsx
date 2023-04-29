import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import imageURL from "../../../assets/carry.png";
import Loading from "../../../components/Loading";

const CarryOrders = ({ filterOrders, getEveryOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdateOrder = async (id, status) => {
    console.log("before status", status);
    const newStatus = Number(status) == 0 ? 1 : 0;
    console.log("after status", newStatus);
    console.log("id", id);
    try {
      setLoading(true);
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
        const data = await getEveryOrder();
        console.log(data);
        setOrders(data);
        return;
      }
      console.log(textUpdate);
      console.log(textNoti);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      document.body.classList.remove("loading");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getEveryOrder();
      console.log(data);
      setOrders(data);
    };
    getData();
  }, [setOrders]);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {filterOrders(orders)?.map((order) => (
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
    </>
  );
};

export default CarryOrders;
