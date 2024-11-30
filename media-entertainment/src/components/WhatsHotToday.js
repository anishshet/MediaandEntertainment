import React from "react";
import ChartCard from "./ChartCard";
import { useNavigate } from "react-router-dom"; // Ensure this is imported for navigation

const WhatsHotToday = () => {
  const navigate = useNavigate(); // Hook for navigation

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    data: [12, 19, 3, 5, 2],
  };

  const handleChartClick = (platform) => {
    if (platform === "Instagram") navigate("/trending-instagram");
    else if (platform === "Twitter") navigate("/trending-twitter");
    else if (platform === "Facebook") navigate("/trending-facebook");
    else if (platform === "YouTube") navigate("/trending-youtube");
  };


  return (
    <section className="text-center py-12">
      <h1 className="text-5xl font-bold mb-12 animate-fade-in">What's Hot Today?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 px-8 mb-16">
        <ChartCard platform="Instagram" chartData={chartData} onClick={handleChartClick} />
        <ChartCard platform="Twitter" chartData={chartData} onClick={handleChartClick} />
        <ChartCard platform="Facebook" chartData={chartData} onClick={handleChartClick} />
        <ChartCard platform="YouTube" chartData={chartData} onClick={handleChartClick} />
      </div>
    </section>
  );
};

export default WhatsHotToday; // Ensure this is a default export
