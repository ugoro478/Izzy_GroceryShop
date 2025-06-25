import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import stripeLogo from "../assets/stripe_logo.png";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const [method, setMethod] = useState("COD");
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
      if (method === "COD") {
        const res = await axios.post(
          "http://localhost:4000/api/order/place",
          {
            amount,
            address: formData,
            cartItems, // ✅ added cart items
          },
          headers
        );
        if (res.status === 200) {
          setCartItems([]);
          toast.success("Order placed successfully (COD)");
          navigate("/orders");
        }
      } else {
        const res = await axios.post(
          "http://localhost:4000/api/order/stripe",
          {
            amount,
            address: formData,
            cartItems, // ✅ added cart items
          },
          headers
        );
        if (res.data.success) {
          window.location.href = res.data.session_url;
        }
      }
    } catch (err) {
      console.error(err);
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
          <fieldset className="border-2 border-gray-300 p-6 rounded-lg">
            <legend className="text-center text-2xl text-black font-semibold">
              Payment Options
            </legend>
            <div className="flex flex-row gap-4">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center border border-gray-300 px-20 py-4 rounded-md cursor-pointer ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              >
                <img src={stripeLogo} alt="Stripe" />
              </div>
              <div
                onClick={() => setMethod("COD")}
                className={`flex items-center border border-gray-300 px-20 py-4 rounded-md cursor-pointer ${
                  method === "COD" ? "bg-green-400" : "text-gray-300"
                }`}
              >
                <span className="text-xl text-black font-bold">
                  CASH ON DELIVERY
                </span>
              </div>
            </div>
          </fieldset>

          <h2 className="text-2xl text-black font-semibold mt-6 mb-4">
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
