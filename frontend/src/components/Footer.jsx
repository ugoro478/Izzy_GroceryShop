import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="px-6 py-10 mt-5 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 hover:text-green-200 transition cursor-pointer">
            {" "}
            <span className="text-green-400 text-4xl">Izzy</span>-GroceryShop
          </h1>
          <p className="text-lg">Fresh groceries delivered to your doorstep</p>
          <div>
            <h2 className="text-2xl font-semibold mt-3">Follow Us</h2>
            <div className="flex gap-4 items-center mt-2 ">
              <a href="#" className="hover:text-green-400 text-2xl ">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-green-400 text-2xl ">
                <FaInstagram />
              </a>
              <a
                href="#"
                className=" hover:text-green-200 transition cursor-pointertext-2xl "
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-3 hover:text-green-200 transition">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="text-lg  hover:text-green-200 transition cursor-pointer">
              Shop
            </li>
            <li className="text-lg hover:text-green-200 transition cursor-pointer">
              Home
            </li>
            <li className="text-lg hover:text-green-200 transition cursor-pointer">
              Categories
            </li>
            <li className="text-lg hover:text-green-200 transition cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-3 hover:text-green-200 transition">
            Contact Us
          </h2>
          <ul className="space-y-2 text-lg ">
            <li className="flex items-center gap-2 hover:text-green-200 transition">
              <FaPhone />
              +234 703 047 8478
            </li>
            <li className="flex items-center gap-2 hover:text-green-200 transition">
              <FaEnvelope />
              support@Izzy-GroceryShop.com
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-md text-green-400 border-t border-gray-400 pt-4 border border-t-gray-400">
        &copy; {new Date().getFullYear()} Izzy-GroceryShop. All Right Reserved
      </div>
    </div>
  );
};

export default Footer;
