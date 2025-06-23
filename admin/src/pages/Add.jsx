import React, { useState } from "react";
import upload from "../assets/upload.jpg";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("All");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (image) formData.append("image", image);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setImage(null);
        setPrice("");
        setDescription("");
        setCategory("All");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-1 items-start"
      >
        <div>
          <p>Upload Image</p>
          <div>
            <label htmlFor="image">
              <img
                src={!image ? upload : URL.createObjectURL(image)}
                alt=""
                className="w-32 cursor-pointer"
              />
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </label>
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2 text-[22px]">Product Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
            className="w-full p-4 max-w-[500px] border border-gray-300 rounded"
          />
        </div>
        <div className="w-full">
          <p className="mb-2 text-[22px]">Product Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter Description"
            className="w-full p-4 max-w-[500px] border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-wrap gap-4 w-full">
          <div className="min-w-[200px]">
            <p className="mb-2 text-[22px]">Grocery Category</p>
            <select
              className="w-full p-4 max-w-[500px] border border-gray-300 rounded text-[16px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Fruits & Vegetable">Fruits & Vegetable</option>
              <option value="Frozen Foods">Frozen Foods</option>
              <option value="Dairy Products">Dairy Products</option>
              <option value="Bakery Items">Bakery Items</option>
              <option value="Meat & Seafood">Meat & Seafood</option>
              <option value="Pantry Staples">Pantry Staples</option>
            </select>
          </div>
          <div>
            <p className="mb-2 text-[22px]">Product Price</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="30"
              className="w-full p-4 max-w-[120px] border border-gray-300 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-20 py-3 text-white bg-green-400 hover:bg-green-600 rounded"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;
