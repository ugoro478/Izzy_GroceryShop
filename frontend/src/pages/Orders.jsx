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
          "http://localhost:4000/api/order/userorders",
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
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm"
          >
            <p className="text-lg font-semibold text-black">
              Order ID:{" "}
              <span className="text-sm text-gray-600">{order._id}</span>
            </p>
            <p className="text-gray-700">
              Payment Method: <strong>{order.paymentMethod}</strong> —{" "}
              <span
                className={order.payment ? "text-green-600" : "text-red-500"}
              >
                {order.payment ? "Paid" : "Pending"}
              </span>
            </p>
            <p className="text-gray-700">
              Total Amount:{" "}
              <strong>${Number(order.amount || 0).toFixed(2)}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Date: {new Date(order.date).toLocaleString()}
            </p>

            <div className="mt-4">
              <p className="font-medium text-black">🛍️ Items:</p>
              <ul className="list-disc ml-6 text-gray-700">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity} — $
                    {Number(item.price).toFixed(2)}
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
