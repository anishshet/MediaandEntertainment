import React from "react";
import step1Img from "../img/choose.png"; // Adjust path as needed
import step2Img from "../img/explore.png"; // Adjust path as needed
import step3Img from "../img/share.png"; // Adjust path as needed

const HowItWorks = () => (
  <div className="w-full bg-[#1F2937] py-16 px-4">
    <h2
      className="text-6xl font-bold text-white text-center mb-8"
      style={{ fontFamily: "Fugaz One" }}
    >
      How it Works
    </h2>
    <p
      className="text-2xl text-gray-300 text-center mb-12"
      style={{ fontFamily: "Open Sans" }}
    >
      A simple guide to getting started with your video uploads.
    </p>

    {/* Images and Descriptions Section */}
    <div className="flex flex-col lg:flex-row justify-center items-center gap-16">
      {/* Step 1 */}
      <div className="flex flex-col items-center text-center mt-8">
        <img
          src={step1Img}
          alt="Explore Trends"
          className="w-64 h-64 mb-8 transform transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-2xl"
        />
        <h3
          className="text-2xl font-semibold text-white mb-4"
          style={{ fontFamily: "Open Sans" }}
        >
          Step 1: Explore the trends
        </h3>
        <p
          className="text-lg text-gray-300"
          style={{ fontFamily: "Open Sans" }}
        >
          Browse trending audio and video content from major platforms.
        </p>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center text-center mt-8">
        <img
          src={step2Img}
          alt="Choose Content"
          className="w-64 h-64 mb-8 transform transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-2xl"
        />
        <h3
          className="text-2xl font-semibold text-white mb-4"
          style={{ fontFamily: "Open Sans" }}
        >
          Step 2: Choose your Content
        </h3>
        <p
          className="text-lg text-gray-300"
          style={{ fontFamily: "Open Sans" }}
        >
          Select the type of content you want to create and share.
        </p>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center text-center mt-8">
        <img
          src={step3Img}
          alt="Upload and Share"
          className="w-64 h-64 mb-8 transform transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-2xl"
        />
        <h3
          className="text-2xl font-semibold text-white mb-4"
          style={{ fontFamily: "Open Sans" }}
        >
          Step 3: Upload and Share
        </h3>
        <p
          className="text-lg text-gray-300"
          style={{ fontFamily: "Open Sans" }}
        >
          Easily upload your video and share it with your audience.
        </p>
      </div>
    </div>
  </div>
);

export default HowItWorks;
