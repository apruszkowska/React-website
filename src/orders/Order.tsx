import React, { useState, useEffect } from "react";
import { Order as OrderType, getAllOrders } from "../api/orders";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export const Orders = () => {
  // const [orders, setOrders] = useState<OrderType[]>([]);

  // useEffect(() => {
  //   getAllOrders().then((data) => {
  //     setOrders(data);
  //   });
  // }, []);
  // console.log(orders);
  // return (
  //   <>
  //     {orders.map((order) => (
  //       <div>
  //         <Link to={`/orders/${order.id}`}>{order.id}</Link>
  //         <div>{order.amount}</div>
  //         <div>{order.title}</div>
  //         <div>{order.phone}</div>
  //         <div>{order.description}</div>
  //       </div>
  //     ))}
  //   </>
  // );

  // cachowanie
  const { data, isLoading, error } = useQuery(["orders"], getAllOrders);

  if (error) {
    return <p>Cannot get orders</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {data?.map((order) => (
        <div key={order.id}>
          <Link to={`/orders/${order.id}`}>{order.id}</Link>
          <div>{order.amount}</div>
          <div>{order.title}</div>
          <div>{order.phone}</div>
          <div>{order.description}</div>
        </div>
      ))}
    </>
  );
};
