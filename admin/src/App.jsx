import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Import the Sidebar component
import List from "./pages/List"; // Import the List page
import Add from "./pages/Add"; // Import the add page
import Orders from "./pages/Orders"; // Import the Orders page
import Login from "./components/Login"; // Import the Login page
import { ToastContainer } from "react-toastify";

export const backendUrl = "http://localhost:4000";
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token" || "")); // Initialize the token state

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-white min-h-screen ">
      <ToastContainer />
      {/* Toast container for notifications */}
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex w-full">
          <Sidebar setToken={setToken} />
          <div className="w-[70%] ml-[max(5vw,25px)] my-8 text-black text-base">
            <Routes>
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
        </div> // If the token is not empty, render the sidebar and the routes
      )}
    </div>
  );
};

export default App;
