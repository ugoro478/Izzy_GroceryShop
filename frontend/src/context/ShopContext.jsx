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
    const isValidId = /^[0-9a-fA-F]{24}$/.test(itemId);
    const isKnownProduct = products.some((p) => p._id === itemId);

    if (!isValidId || !isKnownProduct) {
      toast.error("Invalid product. Could not add to cart.");
      console.warn("Blocked invalid ID:", itemId);
      return;
    }

    const updatedCart = { ...cartItems };
    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
    setCartItems(updatedCart);
    toast.success(`Added to cart`);
    console.log("🛒 Adding to cart:", itemId);
    console.log("🔑 Token:", token);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { productId: itemId, quantity: 1 }, // ✅ Corrected this
          { headers: { token } }
        );
      } catch (error) {
        console.error("❌ Add to cart error:", error);
        toast.error(error.response?.data?.message || "Server error");
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
    const cleanCart = () => {
      const validCart = {};
      for (const [id, qty] of Object.entries(cartItems)) {
        if (
          /^[0-9a-fA-F]{24}$/.test(id) &&
          products.some((p) => p._id === id)
        ) {
          validCart[id] = qty;
        }
      }
      setCartItems(validCart);
    };

    cleanCart();
  }, [products]);

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
