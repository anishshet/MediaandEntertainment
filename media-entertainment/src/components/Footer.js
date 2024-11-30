import React from "react";
import instagramLogo from "../img/instagram.png";
import twitterLogo from "../img/x.jpg";
import youtubeLogo from "../img/youtube.png";
import facebookLogo from "../img/facebook.png";


const Footer = () => (
  <footer className="bg-[#000000] text-white py-8">
    <div
      className="flex flex-col items-center text-center"
      style={{ fontFamily: "Montserrat, sans-serif", opacity: 0.8 }}
    >
      {/* Links Section */}
      <div className="text-[20px] mb-6">
        <a href="#" className="mr-6 hover:text-gray-400">
          About
        </a>
        <a href="#" className="mr-6 hover:text-gray-400">
          Contact
        </a>
        <a href="#" className="hover:text-gray-400">
          Message
        </a>
      </div>

      {/* Social Media Icons */}
      <div className="text-[20px] mb-6 flex justify-center">
        {[twitterLogo, facebookLogo, instagramLogo, youtubeLogo].map((logo, idx) => (
          <a key={idx} href="#" className="mr-6 last:mr-0">
            <img
              src={logo}
              alt="Social"
              className="inline w-6 h-6 hover:scale-110 transition-transform"
            />
          </a>
        ))}
      </div>

      {/* Copyright Text */}
      <p className="text-[20px]" style={{ opacity: 0.8 }}>
        &copy; 2024 MediaX. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
