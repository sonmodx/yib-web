import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import imageURL from "../../../assets/carry.png";
import Loading from "../../../components/Loading";
import Empty from "../components/Empty";

const CarryOrders = ({ filterOrders, getEveryOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(orders);

  const handleUpdateOrder = async (id, status) => {
    console.log("before status", status);
    const newStatus = Number(status) == 0 ? 1 : 0;
    try {
      setLoading(true);
      document.body.classList.add("loading");
      const updateResponse = await fetch(
        `/food/updateorder?OrderID=${id}&Status=${newStatus}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const textUpdate = await updateResponse.text();

      if (updateResponse.ok) {
        console.log("SUCCESS CHANGE STATE");
        const data = await getEveryOrder();
        console.log(data);
        setOrders(data);
        return;
      }
      console.log(textUpdate);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      document.body.classList.remove("loading");
    }

    console.log("after status", newStatus);
    console.log("id", id);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getEveryOrder();
      console.log(data);
      setOrders(data);
      setLoading(false);
    };
    getData();
  }, [setOrders]);
  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <Empty />;
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
          name={order.username}
          raiderUsername={order.raiderUsername}
          action={() => handleUpdateOrder(order.id, order.status)}
        />
      ))}
    </>
  );
};

export default CarryOrders;
