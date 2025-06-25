import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { MdDelete } from "react-icons/md";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [CartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length === 0) return;
    if (!cartItems || typeof cartItems !== "object") {
      setCartData([]);
      return;
    }

    const tempData = Object.entries(cartItems)
      .filter(([, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => ({
        _id: itemId,
        quantity,
      }));

    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div>
      <div>
        <h2 className="text-2xl text-white mt-4 font-bold mb-4">Cart Items</h2>
      </div>

      <div className="flex flex-col gap-4">
        {CartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          if (!productData) return null;

          return (
            <div
              key={index}
              className="grid grid-cols-[4fr_0.5fr_0.5fr] items-center border-y border-gray-700 text-gray-300"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image}
                  alt=""
                  className="w-16 h-auto object-cover"
                />
                <div className="flex flex-col">
                  <p className="text-xl font-medium">{productData.name}</p>
                  <p className="text-lg text-green-400">${productData.price}</p>
                </div>
              </div>

              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="w-[50px] h-[35px] border border-gray-400 text-center self-center"
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, Number(e.target.value))
                }
              />

              <MdDelete
                onClick={() => updateQuantity(item._id, 0)}
                className="text-2xl cursor-pointer self-center justify-self-center text-red-600"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-20 bg-white p-4 max-w-xl mx-auto">
        <div className="w-full max-w-md">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className="bg-green-400 text-black mt-8 py-3 px-8 rounded hover:bg-emerald-500"
              onClick={() => navigate("/checkout")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
