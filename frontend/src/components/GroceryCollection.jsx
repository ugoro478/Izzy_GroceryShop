import React, { useContext } from "react";
import { categoryItem } from "../assets/assets";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";

const GroceryCollection = () => {
  const { products, addToCart } = useContext(ShopContext);

  const [category, setCategory] = useState("All");
  return (
    <div className="">
      <div className="mt-[50px]">
        <div className="border-b-4 border-b-green-400 mt-8">
          <h1 className="text-3xl mb-5 text-white font-bold">
            Discover Our Groceries
          </h1>
        </div>

        <div className="flex mx-auto px-4 flex-col gap-6 bg-white">
          <div>
            <ul className="flex justify-around mt-8">
              {categoryItem.map((item, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setCategory((prev) =>
                      prev === item.category_title ? "All" : item.category_title
                    )
                  }
                  className={`min-w-[150px] p-3 rounded-xl shadow bg-white flex flex-col items-center cursor-pointer hover:scale-105 ${
                    category === item.category_title
                      ? "text-green-400"
                      : "text-gray-700"
                  }`}
                >
                  <img
                    src={item.category_img}
                    alt=""
                    className="w-22 h-22 object-contain mb-2"
                  />
                  <p className="text-sm font-medium text-center">
                    {item.category_title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white w-full ">
          {products.length > 0 ? (
            products
              .filter(
                (product) => category === "All" || category === product.category
              )
              .map((product) => (
                <div
                  key={product._id}
                  className="w-full max-w-sm border mx-auto border-gray-400  p-5 mt-5 text-center relative overflow-hidden hover:shadow-lg"
                >
                  <div>
                    <img
                      src={product.image}
                      alt=""
                      className="w-full h-[260px] object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-2 mb-3">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4 px-2">
                    <p className="text-xl font-bold text-green-600">
                      ${product.price}
                    </p>
                    <button
                      onClick={() => addToCart(product._id)}
                      className="px-4 py-2 bg-green-400 text-black hover:bg-green-600 rounded"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p> No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryCollection;
