import React, { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import stripe from "../assets/stripe_logo.png";
import CartTotal from "../components/CartTotal";
import { data } from "react-router-dom";

const Checkout = () => {
  const [method, setMethod] = useState("COD");

  const {
    cartItems,
    setCartItems,
    products,
    getCartAmount,
    navigate,
    delivery_fee,
  } = useContext(ShopContext);

  const [FormDate, setFormData] = useState({
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

  const OnChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white px-4 md:px-20 py-8">
      <form className="flex flex-row gap-24 pt-8 min-h-[80vh] border-t border-gray-300">
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
                <img src={stripe} alt="" />
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
          <div className="mt-6">
            <h2 className="text-2xl text-black font-semibold mb-4">
              Shipping Details
            </h2>
          </div>

          <div className="flex gap-4 ">
            <input
              type="text"
              onChange={OnChangeHandler}
              placeholder="First Name"
              name="firstName"
              value={FormData.firstName}
              className="border border-gray-400 rounded px-4 py-3 w-[95%]"
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={OnChangeHandler}
              name="lastName"
              value={FormData.lastName}
              className="border border-gray-400 rounded px-4 py-3 w-[95%]"
            />
          </div>
          <input
            type="email"
            onChange={OnChangeHandler}
            placeholder="Email"
            name="email"
            value={FormData.email}
            className="border border-gray-400 rounded px-4 py-3 w-[95%]"
          />
          <input
            type="text"
            onChange={OnChangeHandler}
            placeholder="Phone Number"
            name="phone"
            value={FormData.phone}
            className="border border-gray-400 rounded px-4 py-3 w-[95%]"
          />
          <input
            type="text"
            onChange={OnChangeHandler}
            placeholder="Street Address"
            name="Street"
            value={FormData.address}
            className="border border-gray-400 rounded px-4 py-3 w-[95%]"
          />
          <div className="flex gap-4 ">
            <input
              type="text"
              onChange={OnChangeHandler}
              placeholder="city"
              name="city"
              value={FormData.city}
              className="border border-gray-400 rounded px-4 py-3 w-[95%]"
            />
            <input
              type="text"
              onChange={OnChangeHandler}
              placeholder="State"
              name="state"
              value={FormData.state}
              className="border border-gray-400 rounded px-4 py-3 w-[95%]"
            />
          </div>
          <div className="flex gap-4 ">
            <input
              type="text"
              onChange={OnChangeHandler}
              placeholder="Zipcode"
              name="zipcode"
              value={FormData.zipcode}
              className="border border-gray-400 rounded px-4 py-3 w-[95%]"
            />
            <input
              type="text"
              onChange={OnChangeHandler}
              placeholder="Country"
              name="country"
              value={FormData.country}
              className="border border-gray-400 rounded px-4 py-3 w-[95%]"
            />
          </div>
        </div>

        <div className="w-[600px]">
          <CartTotal />
          <div className="text-right mt-8 ">
            <button
              onChange={OnChangeHandler}
              type="submit"
              className="bg-green-400 hover:bg-emerald-500 text-black w-full py-3 text-base rounded-md "
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
