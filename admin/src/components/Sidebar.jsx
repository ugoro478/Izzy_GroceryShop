import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = ({ setToken }) => {
  return (
    <div className="w-[22%] min-h-screen border-r-2 border-green-400 bg-white">
      <div className="mt-4 px-6">
        <h2 to="/" className="text-[32px] text-green-400 font-bold">
          Izzy-GroceryShop
        </h2>
      </div>
      <div className="flex flex-col gap-4 pt-6">
        <NavLink
          to="/add"
          className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-green-500 hover:text-white"
        >
          <IoMdAddCircleOutline className="text-[35px] text-black" />
          <p className="hidden md:block text-base">Add Product</p>
        </NavLink>

        <NavLink
          to="/list"
          className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-green-500 hover:text-white"
        >
          <FaListUl className="text-[35px] text-black" />
          <p className="hidden md:block text-base">List Products</p>
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-green-500 hover:text-white"
        >
          <MdOutlineShoppingCart className="text-[35px] text-black" />
          <p className="hidden md:block text-base">Orders</p>
        </NavLink>

        <button
          onClick={() => setToken("")}
          className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 hover:bg-red-600 hover:text-white w-full text-left"
        >
          <IoIosLogOut className="text-[35px] text-black" />
          <p className="hidden md:block text-base">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
