import React from "react";

const Card = ({ platform, info }) => (
  <div className="bg-[#1F2937] p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl duration-300">
    <h3 className="text-2xl font-semibold text-white mb-4">{platform}</h3>
    <ul className="text-gray-300">
      {info.map((item, index) => (
        <li key={index} className="mb-2">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Card;
