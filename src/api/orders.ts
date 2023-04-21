export type Order = {
  id: number;
  amount: number;
  title: string;
  description: string;
  phone: string;
};

export const getAllOrders = async () => {
  const response = await fetch(`http://localhost:3000/orders`);
  if (!response.ok) {
    return [] as Order[];
  }
  const data = await response.json();
  return data as Order[];
};

export const getSingleOrder = async (orderId: string) => {
  const response = await fetch(`http://localhost:3000/orders/${orderId}`);
  if (response.ok) {
    const data = await response.json();
    return data as Order;
  }

  return null;
};

export const addOrder = async (newOrder: Omit<Order, "id">) => {
  const response = await fetch(`http://localhost:3000/orders`, {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(newOrder),
  });
  if (!response.ok) {
    return {};
  }
  const data = await response.json();
  return data as Order;
};

const updateOrderById = async (updateOrderData: Order, id: string) => {
  const response = await fetch(`http://localhost:3000/orders/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(updateOrderData),
  });
  const data = await response.json();
  return data;
};

const deleteOrderById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/orders/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
