// src/components/TrendingInstagram.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data (replace with your scraped Instagram data)
const trendsData = [
  { hashtag: "#trending1", count: 1200 },
  { hashtag: "#viral", count: 950 },
  { hashtag: "#instalife", count: 830 },
];

// Mock data for audios and tags
const trendingAudios = [
  { name: "Audio 1", count: 320 },
  { name: "Audio 2", count: 280 },
  { name: "Audio 3", count: 230 },
];

const trendingTags = [
  { tag: "#fun", posts: 5000 },
  { tag: "#reels", posts: 4500 },
  { tag: "#music", posts: 4000 },
];

// Line Chart Data (for Bigger Chart)
const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Mentions Over Time",
      data: [500, 600, 700, 800, 900, 1000],
      fill: true,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.4,
      borderWidth: 2,
    },
  ],
};

// Pie Chart Data
const pieChartData = {
  labels: ["#trending1", "#viral", "#instalife"],
  datasets: [
    {
      label: "Hashtag Mentions",
      data: [1200, 950, 830],
      backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

const TrendingYoutube = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="min-h-screen bg-[#1F2937] text-white p-8">
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="bg-blue-500 px-4 py-2 rounded mb-6"
        >
          Back
        </button>

        <h1 className="text-4xl font-bold mb-8">Trending on Youtube</h1>

        {/* Trend Cards Section (4 charts in a row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {trendsData.map((trend, index) => (
            <div
              key={index}
              className="p-6 bg-[#374151] rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">{trend.hashtag}</h2>
              <p className="text-gray-300">Mentions: {trend.count}</p>
            </div>
          ))}
        </div>

        {/* Bigger Chart (60%) and Pie Chart (40%) side by side */}
        <div className="flex gap-8 mb-8">
          {/* Bigger Chart - 60% width */}
          <div className="p-6 bg-[#374151] rounded-lg shadow-lg w-3/5">
            <h2 className="text-2xl font-semibold mb-4">Bigger Chart</h2>
            {/* Line Chart with Animation */}
            <Line data={lineChartData} options={{ responsive: true, animation: { duration: 1500 } }} />
          </div>

          {/* Pie Chart - 40% width */}
          <div className="p-6 bg-[#374151] rounded-lg shadow-lg w-2/5">
            <h2 className="text-2xl font-semibold mb-4">Pie Chart</h2>
            {/* Pie Chart with Animation */}
            <Pie data={pieChartData} options={{ responsive: true, animation: { duration: 1500 } }} />
          </div>
        </div>

        {/* Trending Audios Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {trendingAudios.map((audio, index) => (
            <div
              key={index}
              className="p-6 bg-[#374151] rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{audio.name}</h3>
              <p className="text-gray-300">Plays: {audio.count}</p>
            </div>
          ))}
        </div>

        {/* Trending Tags Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTags.map((tag, index) => (
            <div
              key={index}
              className="p-6 bg-[#374151] rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{tag.tag}</h3>
              <p className="text-gray-300">Posts: {tag.posts}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default TrendingYoutube;
