import React, { useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import Card from "../components/Card";
import imageURL from "../../../assets/main-image.png";
const ShowOrders = ({ getMyOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(orders);
  useEffect(() => {
    const getData = async () => {
      const data = await getMyOrder();
      console.log(data);
      setOrders(data);
    };
    getData();
  }, [setOrders]);

  const cancelOrder = async (id, status) => {
    if (status !== 0) return;
    console.log("id", id);
    try {
      setLoading(true);
      document.body.classList.add("loading");
      const response = await fetch(`/food/cancelfark?OrderID=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await response.text();

      if (response.ok) {
        console.log("SUCCESS CANCEL ORDER");
        const data = await getMyOrder();
        setOrders(data);
        return;
      }
      console.log(text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      document.body.classList.remove("loading");
    }
  };

  const acceptOrder = async (id) => {
    console.log("id", id);
    try {
      setLoading(true);
      document.body.classList.add("loading");
      const response = await fetch(`/food/acceptfark?OrderID=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await response.text();

      if (response.ok) {
        console.log("SUCCESS ACCEPT ORDER");
        const data = await getMyOrder();
        setOrders(data);
        return;
      }
      console.log(text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      document.body.classList.remove("loading");
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {orders?.map((order) => (
        <Card
          key={order.id}
          id={order.id}
          title={order.header}
          desc={order.description}
          status={order.status}
          imageURL={imageURL}
          name={order.username}
          raiderUsername={order.raiderUsername}
          action={() => {
            cancelOrder(order.id, order.status);
          }}
          actionSuccess={() => acceptOrder(order.id)}
        />
      ))}
    </>
  );
};

export default ShowOrders;
