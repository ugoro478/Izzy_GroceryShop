import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";

const verify = () => {
  const { navigate, token, setCartItems } = useContext(ShopContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: token }
      );

      if (response.data.sucess) {
        setCartItems([]);
        navigate("/orders");
        toast.success("Order Placed Successfully");
      } else {
        navigate("/cart");
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>verify</div>;
};

export default verify;
