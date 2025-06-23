import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful");
      } else {
        toast.error(response.data.message);
      }
      // console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-green-400 mb-4">
            Admin Login
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Email Address
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-[95%] px-3 py-3 border border-gray-300 rounded-md text-sm focus-within:outline-none focus:border-b-gray-800"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Enter your Password
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
                className="w-[95%] px-3 py-3 border border-gray-300 rounded-md text-sm focus-within:outline-none focus:border-b-gray-800"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-lg font-bold bg-green-400 hover:bg-green-600 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
