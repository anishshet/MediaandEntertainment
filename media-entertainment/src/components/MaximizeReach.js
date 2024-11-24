import React from "react";
import newImage from "../img/content.jpg";

const MaximizeReach = () => (
  <div className="w-full bg-[#111827] py-16 px-4">
    <h2 className="text-6xl font-bold text-white text-center mb-8">Maximize Your Reach</h2>
    <p className="text-lg text-gray-300 text-center mb-12">Share your creativity with the world.</p>
    <div className="flex justify-center mb-16">
      <img src={newImage} alt="Maximize Your Reach" className="w-[1024px] h-[554px] object-cover rounded-3xl" />
    </div>
  </div>
);

export default MaximizeReach;
