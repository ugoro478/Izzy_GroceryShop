import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { staticProductList } from "../assets/assets"; // ✅ make sure this file exports correctly

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState(staticProductList); // ✅ this was missing
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const delivery_fee = 15;

  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItems };
    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
    setCartItems(updatedCart);
    toast.success(`Added to cart`);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (authToken) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token: authToken } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce(
      (totalAmount, [itemId, quantity]) => {
        const itemInfo = products.find((product) => product._id === itemId);
        return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount;
      },
      0
    );
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        delivery_fee,
        navigate,
        cartItems,
        setCartItems,
        getUserCart,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        token,
        setToken,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
