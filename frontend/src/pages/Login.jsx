import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex mt-8 items-center justify-center">
      <div className="bg-white max-w-[700px] w-full p-8 rounded-lg shadow-lg">
        <form className=" flex flex-col items-center w-[90%] max-w-md mx-auto mt-14 gap-4 text-gray-700 ">
          <div className="inline-flex items-center gap-2.5 mt-10">
            <p className="text-[1.8rem] font-semibold">{currentState}</p>
          </div>

          {currentState !== "Login" && (
            <input
              type="text"
              value={name} // set the value of the input to the state
              onChange={(e) => setName(e.target.value)} // update the state when the input changes
              placeholder="Full Name"
              className="w-full px-3 py-3 border border-gray-300 rounded-md "
              required
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-md "
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-3 border border-gray-300 rounded-md "
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
