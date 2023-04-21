import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Order as OrderType, getSingleOrder } from "../api/orders";
import { getClientByPhoneNumber } from "../api/clients";

export const SingleOrder = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    if (id) {
      getSingleOrder(id).then((data) => {
        setOrder(data);
        if (data && data.phone) {
          getClientByPhoneNumber(data?.phone).then((client) => {
            console.log("client", client);
          });
        }
      });
    }
  }, []);
  console.log(order);

  if (!order) {
    return <p>Brak zamówienia o takim id</p>;
  }
  return (
    <div>
      <Link to={`/clients/${order?.id}`}>{order.phone}</Link>
      <div>{order?.amount}</div>
      <div>{order?.title}</div>
      <div>{order?.phone}</div>
      <div>{order?.description}</div>
    </div>
  );
};
