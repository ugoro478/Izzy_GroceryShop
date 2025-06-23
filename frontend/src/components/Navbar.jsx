import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { getCartCount } = useContext(ShopContext);
  return (
    <div>
      <nav className="flex justify-between p-[1.5rem] border-b-4 border-b-green-400">
        <div>
          <Link to="/">
            <h2 className="text-4xl font-bold ">
              <span className="text-green-400 text-4xl">Izzy</span>-GroceryShop
            </h2>
          </Link>
        </div>
        <div className="flex gap-6">
          <Link to="/login">
            <p className="hover:border-b-2 hover:border-b-green-400 text-xl">
              LOGIN
            </p>
          </Link>
          <Link to="/orders">
            <p className="hover:border-b-2 hover:border-b-green-400 text-xl">
              ORDERS
            </p>
          </Link>
          <Link to="/logout">
            <p className="hover:border-b-2 hover:border-b-red-400 text-xl">
              LOGOUT
            </p>
          </Link>
          <Link to="/cart">
            <p className="hover:border-b-2 hover:border-b-green-400 text-xl">
              CART
            </p>
          </Link>
          <span className="bg-red-600 rounded-full py-2 px-4 text-white">
            {getCartCount()}
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
