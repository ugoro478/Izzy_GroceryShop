import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/order/user",
          { userId },
          { headers: { token } }
        );

        if (res.data.success) {
          setOrders(res.data.order);
        } else {
          toast.error("Could not fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, [userId, token]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🧾 Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded p-4 mb-6"
          >
            <p className="text-lg font-semibold">
              Order ID: <span className="text-sm">{order._id}</span>
            </p>
            <p className="text-gray-700">
              Payment: {order.paymentMethod} -{" "}
              <span className={order.payment ? "text-green-600" : "text-red-500"}>
                {order.payment ? "Paid" : "Pending"}
              </span>
            </p>
            <p>Total: <strong>${order.amount}</strong></p>
            <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleString()}</p>
            <div className="mt-4">
              <p className="font-medium">Items:</p>
              <ul className="list-disc ml-6">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity} — ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
