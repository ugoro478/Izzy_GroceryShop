import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response);

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">All Orders</h3>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse whitespace-nowrap">
          <thead>
            <tr>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Customer
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Email
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Pnone Number
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Shipping Address
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Product Name
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Quantity
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                {" "}
                Items
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Price
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Payment Method
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Payment Status
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Date
              </th>
              <th className="px-3 py-2 border text-left bg-gray-100 font-bold">
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="px-3 py-2 border ">
                  {order.address.firstName}{" "}
                </td>
                <td className="px-3 py-2 border ">{order.address.email}</td>
                <td className="px-3 py-2 border ">{order.address.phone}</td>
                <td className="px-3 py-2 border ">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state} , {order.address.country},
                  {order.address.zipcode}
                </td>
                <td className="px-3 py-2 border ">
                  {order.items.map((item, index) => (
                    <p key={i}>{item.name}</p>
                  ))}
                </td>
                <td className="px-3 py-2 border ">
                  {order.items.map((item, index) => (
                    <p key={i}>{item.quantity}</p>
                  ))}
                </td>
                <td className="px-3 py-2 border ">{order.items.length}</td>
                <td className="px-3 py-2 border ">
                  {currency}
                  {order.amount}
                </td>
                <td className="px-3 py-2 border ">{order.paymentMethod}</td>
                <td className="px-3 py-2 border ">
                  {order.payment ? "Done" : "pending"}
                </td>
                <td className="px-3 py-2 border ">
                  {new Date(order.date).toLocalString()}
                </td>
                <td className="px-3 py-2 border ">
                  <select
                    value={order.status}
                    className="px-2 py-1 border-gray-400 rounded bg-white"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
