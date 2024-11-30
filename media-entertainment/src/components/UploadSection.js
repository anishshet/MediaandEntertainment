import React from "react";
import instagramLogo from "../img/instagram.png";
import twitterLogo from "../img/x.jpg";
import youtubeLogo from "../img/youtube.png";
import facebookLogo from "../img/facebook.png";

const platforms = [
  { name: "Instagram", logo: instagramLogo, color: "#EC4899" },
  { name: "Twitter", logo: twitterLogo, color: "#22C55E" },
  { name: "YouTube", logo: youtubeLogo, color: "#EF4444" },
  { name: "Facebook", logo: facebookLogo, color: "#3B82F6" },
];

const UploadSection = () => {
  const handleFileChange = (platform, event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`${platform} upload: `, file.name);
    }
  };

  return (
    <div className="w-full bg-[#111827] py-16 px-4">
      <h2 className="text-5xl font-bold text-white text-center mb-8 animate-fade-in">
        Upload Your Content
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 px-8">
        {platforms.map(({ name, logo, color }) => (
          <div
            key={name}
            className="bg-[#1F2937] p-6 rounded-lg text-center shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <img
              src={logo}
              alt={name}
              className="w-16 mx-auto mb-4 animate-pulse"
            />
            <h3 className="text-3xl font-semibold text-white mb-8">{name}</h3> {/* Increased margin-bottom */}
            <label
              className="px-6 py-3 rounded-lg cursor-pointer text-white transform transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
            >
              Upload
              <input
                type="file"
                accept="video/*,image/*"
                className="hidden"
                onChange={(e) => handleFileChange(name, e)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadSection;
