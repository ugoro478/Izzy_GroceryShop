import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full text-gray-800 ">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mt-4 ">CART TOTAL</h2>
      </div>
      <div className="text-base">
        <div className="flex justify-between my-2">
          <p>SubTotal</p>
          <p>${getCartAmount()}</p>
        </div>
        <hr className="border border-green-100 my-2" />

        <div className="flex justify-between my-2">
          <p>Shipping Fee</p>
          <p>${delivery_fee}</p>
        </div>

        <div className="flex justify-between mt-4 font-bold">
          <b>Total</b>
          <b>${getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
