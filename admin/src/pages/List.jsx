import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeGrocery = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { _id: id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-2 font-bold text-2xl">Grocery List</p>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center p-2 border-b-2 border-green-400 text-lg font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center p-2 border-b-2 border-gray-400 text-lg"
            key={index}
          >
            <img src={item.image} alt="" className="w-[50px] h-auto" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <MdDeleteForever
              onClick={() => removeGrocery(item._id)}
              className="ml-10 text=[28px] cursor-pointer text-red-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
