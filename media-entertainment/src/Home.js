// src/Home.js
import React from "react";
import Navbar from "./components/Navbar";
import WhatsHotToday from "./components/WhatsHotToday";
import HowItWorks from "./components/HowItWorks";
import UploadSection from "./components/UploadSection";
import Footer from "./components/Footer";


const Home = () => {
  return (

    <div className="min-h-screen bg-[#111827] text-white">
      <Navbar />
      <main className="pt-16"> {/* Add padding-top to prevent overlap */}
        <WhatsHotToday />
        <HowItWorks />
        <UploadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
