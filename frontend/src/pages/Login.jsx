import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
      ...(currentState !== "Login" && { name }),
    };

    try {
      const url =
        currentState === "Login"
          ? "http://localhost:4000/api/user/login"
          : "http://localhost:4000/api/user/register";

      const res = await axios.post(url, payload);
      const { token, userId } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      toast.success(`${currentState} successful`);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex mt-8 items-center justify-center">
      <div className="bg-white max-w-[700px] w-full p-8 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-[90%] max-w-md mx-auto mt-14 gap-4 text-gray-700"
        >
          <div className="inline-flex items-center gap-2.5 mt-10">
            <p className="text-[1.8rem] font-semibold">{currentState}</p>
          </div>

          {currentState !== "Login" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-3 py-3 border border-gray-300 rounded-md"
              required
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-3 border border-gray-300 rounded-md"
            required
          />

          <div className="flex justify-between w-full text-xl -mt-2 ">
            <p className="cursor-pointer hover:underline text-xl ">
              Forget Password ?
            </p>
            {currentState === "Login" ? (
              <p
                className="cursor-pointer text-blue-600 text-xl hover:underline"
                onClick={() => setCurrentState("Sign Up")}
              >
                Create Account
              </p>
            ) : (
              <p
                className="cursor-pointer text-blue-600 text-xl hover:underline"
                onClick={() => setCurrentState("Login")}
              >
                Login Here
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-400 hover:bg-emerald-500 text-black w-full py-3 text-base rounded-md transition"
          >
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
