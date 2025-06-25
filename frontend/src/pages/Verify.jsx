// pages/Verify.jsx
import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Verify = () => {
  const [params] = useSearchParams();
  const { navigate, setCartItems } = useContext(ShopContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verify = async () => {
      const orderId = params.get("orderId");
      const success = params.get("success");

      try {
        const res = await axios.post(
          "http://localhost:4000/api/order/verifyStripe",
          { orderId, success },
          { headers: { token } }
        );

        if (res.data.success) {
          toast.success("Payment verified and order placed!");
          setCartItems([]);
          navigate("/orders");
        } else {
          toast.error("Payment failed.");
          navigate("/cart");
        }
      } catch (err) {
        console.error(err);
        toast.error("Verification error");
      }
    };

    verify();
  }, []);

  return <div className="text-center py-12">Verifying Payment...</div>;
};

export default Verify;
