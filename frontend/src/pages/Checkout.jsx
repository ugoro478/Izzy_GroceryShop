import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const { cartItems, setCartItems, getCartAmount, navigate, delivery_fee } =
    useContext(ShopContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const amount = getCartAmount() + delivery_fee;
    const headers = { headers: { token } };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/order/place",
        {
          amount,
          address: formData,
          cartItems, // ✅ make sure cartItems is valid object
        },
        headers
      );

      if (res.status === 200) {
        setCartItems([]); // clear cart
        toast.success("Order placed successfully!");
        navigate("/orders");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      toast.error("Order failed!");
    }
  };

  return (
    <div className="bg-white px-4 md:px-20 py-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-24 pt-8 min-h-[80vh] border-t border-gray-300"
      >
        <div className="flex flex-col gap-4 w-full max-w-[700px]">
          <h2 className="text-2xl text-black font-semibold mb-4">
            Shipping Details
          </h2>

          {[
            { name: "firstName", placeholder: "First Name" },
            { name: "lastName", placeholder: "Last Name" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Phone Number" },
            { name: "address", placeholder: "Street Address" },
            { name: "city", placeholder: "City" },
            { name: "state", placeholder: "State" },
            { name: "zipcode", placeholder: "Zipcode" },
            { name: "country", placeholder: "Country" },
          ].map(({ name, placeholder, type = "text" }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required
              className="border border-gray-400 rounded px-4 py-3 w-full mb-2"
            />
          ))}
        </div>

        <div className="w-[600px]">
          <CartTotal />
          <div className="text-right mt-8">
            <button
              type="submit"
              className="bg-green-400 hover:bg-emerald-500 text-black w-full py-3 text-base rounded-md"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
