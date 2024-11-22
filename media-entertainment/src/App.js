import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";

// Importing images
import step1Img from "./img/choose.png";
import step2Img from "./img/explore.png";
import step3Img from "./img/share.png";
import newImage from "./img/content.jpg"; // Image for the Maximize Your Reach section
import instagramLogo from "./img/instagram.png"; // Add logos
import twitterLogo from "./img/x.png";
import youtubeLogo from "./img/youtube.png";
import facebookLogo from "./img/facebook.png";

const App = () => (
  <div>
    {/* Header Section */}
    <Header />

    {/* Body Section: Cards */}
    <div className="min-h-screen bg-[#111827] text-white flex flex-col items-center py-8">
      {/* Top Middle Text */}
      <h1 className="text-5xl font-bold mb-12">What's Hot Today?</h1>

      {/* Cards Section: 2x2 Grid with Full Width Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 w-full px-8 mb-16">
        <Card
          platform="Instagram"
          info={["Top trending Audios", "Top influencers posts"]}
        />
        <Card
          platform="Twitter"
          info={["Top trending Audios", "Top influencers posts"]}
        />
        <Card
          platform="Facebook"
          info={["Top trending Audios", "Top influencers posts"]}
        />
        <Card
          platform="YouTube"
          info={["Top trending Audios", "Top influencers posts"]}
        />
      </div>

      {/* New Section - How it Works */}
      <div className="w-full bg-[#1F2937] py-16 px-4">
        <h2 className="text-6xl font-bold text-white text-center mb-8" style={{ fontFamily: 'Fugaz One' }}>
          How it works
        </h2>
        <p className="text-2xl text-gray-300 text-center mb-12" style={{ fontFamily: 'Open Sans' }}>
          A simple guide to getting started with your video uploads.
        </p>

        {/* Steps Section */}
        <div className="flex justify-around space-x-8">
          <div className="flex flex-col items-center text-center mt-8">
            <img
              src={step1Img}
              alt="Explore Trends"
              className="w-64 h-64 mb-8 transform transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-2xl"
            />
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'Open Sans' }}>
              Step 1: Explore the trends
            </h3>
            <p className="text-lg text-gray-300" style={{ fontFamily: 'Open Sans' }}>
              Browse trending audio and video content from major platforms.
            </p>
          </div>

          <div className="flex flex-col items-center text-center mt-8">
            <img
              src={step2Img}
              alt="Choose Content"
              className="w-64 h-64 mb-8 transform transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-2xl"
            />
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'Open Sans' }}>
              Step 2: Choose your Content
            </h3>
            <p className="text-lg text-gray-300" style={{ fontFamily: 'Open Sans' }}>
              Select the type of content you want to create and share.
            </p>
          </div>

          <div className="flex flex-col items-center text-center mt-8">
            <img
              src={step3Img}
              alt="Upload and Share"
              className="w-64 h-64 mb-8 transform transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-2xl"
            />
            <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'Open Sans' }}>
              Step 3: Upload and Share
            </h3>
            <p className="text-lg text-gray-300" style={{ fontFamily: 'Open Sans' }}>
              Easily upload your video and share it with your audience.
            </p>
          </div>
        </div>
      </div>

      {/* New Section - Maximize Your Reach */}
      <div className="w-full bg-[#111827] py-16 px-4">
        <h2 className="text-6xl font-bold text-white text-center mb-8" style={{ fontFamily: 'Fugaz One' }}>
          Maximize Your Reach
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12" style={{ fontFamily: 'Open Sans' }}>
          Share your creativity with the world.
        </p>

        {/* Image Section */}
        <div className="flex justify-center mb-16">
          <img
            src={newImage}
            alt="Maximize Your Reach"
            className="w-[1024px] h-[554px] object-cover rounded-3xl"
          />
        </div>
      </div>

      {/* New Section - Upload Your Content */}
      <div className="w-full bg-[#1F2937] py-16 px-4">
        <h2 className="text-5xl font-bold text-white text-center mb-8">
          Upload Your Content
        </h2>
        <p className="text-xl text-gray-300 text-center mb-12">
          Share your latest creations with the world. Select a platform and get started.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 px-8">
          {/* Instagram Card */}
          <div className="bg-[#111827] p-6 rounded-lg text-center shadow-lg">
            <img src={instagramLogo} alt="Instagram" className="w-16 mx-auto mb-4" />
            <h3 className="text-3xl font-semibold text-white mb-4">Instagram</h3>
            <button className="bg-[#EC4899] text-white px-6 py-3 rounded-lg">
              Upload
            </button>
          </div>

          {/* Twitter Card */}
          <div className="bg-[#111827] p-6 rounded-lg text-center shadow-lg">
            <img src={twitterLogo} alt="Twitter" className="w-16 mx-auto mb-4" />
            <h3 className="text-3xl font-semibold text-white mb-4">Twitter</h3>
            <button className="bg-[#22C55E] text-white px-6 py-3 rounded-lg">
              Upload
            </button>
          </div>

          {/* YouTube Card */}
          <div className="bg-[#111827] p-6 rounded-lg text-center shadow-lg">
            <img src={youtubeLogo} alt="YouTube" className="w-16 mx-auto mb-4" />
            <h3 className="text-3xl font-semibold text-white mb-4">YouTube</h3>
            <button className="bg-[#EF4444] text-white px-6 py-3 rounded-lg">
              Upload
            </button>
          </div>

          {/* Facebook Card */}
          <div className="bg-[#111827] p-6 rounded-lg text-center shadow-lg">
            <img src={facebookLogo} alt="Facebook" className="w-16 mx-auto mb-4" />
            <h3 className="text-3xl font-semibold text-white mb-4">Facebook</h3>
            <button className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Section */}
    {/* Footer Section */}
<div className="w-full bg-black text-white py-8 text-center">
  {/* MediaX Name */}
  <div className="mb-4">
    <h1 className="text-2xl font-bold">MediaX</h1>
  </div>

  {/* Footer Links */}
  <div className="text-2xl mb-4">
    <a href="#" className="mr-6 text-lg">About</a>
    <a href="#" className="mr-6 text-lg">Contact</a>
    <a href="#" className="mr-6 text-lg">Message</a>
  </div>

  {/* Social Media Icons */}
  <div className="text-lg mb-4">
    <a href="#" className="mr-6 text-lg">
      <img src={twitterLogo} alt="X" className="inline w-6 h-6" />
    </a>
    <a href="#" className="mr-6 text-lg">
      <img src={facebookLogo} alt="Facebook" className="inline w-6 h-6" />
    </a>
    <a href="#" className="mr-6 text-lg">
      <img src={instagramLogo} alt="Instagram" className="inline w-6 h-6" />
    </a>
    <a href="#" className="mr-6 text-lg">
      <img src={youtubeLogo} alt="YouTube" className="inline w-6 h-6" />
    </a>
  </div>

  {/* Copyright Message */}
  <p className="text-sm">&copy; 2024 MediaX. All rights reserved.</p>
</div>

  </div>
);

export default App;
