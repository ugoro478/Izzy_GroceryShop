import React from "react";
import bgImage from "../assets/Hero01.jpg";

const Hero = () => {
  return (
    <div
      className="relative h-[90vh] w-full bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
        <h2 className="text-lg md:text-4xl mb-4 tracking-widest uppercase">
          Shop smarter, eat fresher.
        </h2>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase">
          Start your grocery <br /> journey now.
        </h1>
        <button className="bg-green-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-green-600">
          {" "}
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Hero;
