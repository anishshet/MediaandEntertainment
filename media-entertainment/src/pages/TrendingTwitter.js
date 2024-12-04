import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(false);

  // Simulated data
  const topTrends = [
    ["#Crypto", 150],
    ["#TechNews", 120],
    ["#AIRevolution", 95],
    ["#ClimateChange", 80],
    ["#MusicLovers", 60],
  ];

  const summaryData = {
    "Video 1": { mean: 60 },
    "Video 2": { mean: 45 },
    "Video 3": { mean: 70 },
    "Video 4": { mean: 50 },
    "Video 5": { mean: 65 },
  };

  const timeSeriesData = {
    "Jan": 50,
    "Feb": 55,
    "Mar": 60,
    "Apr": 52,
    "May": 65,
    "Jun": 70,
    "Jul": 75,
    "Aug": 80,
    "Sep": 85,
    "Oct": 90,
    "Nov": 95,
    "Dec": 100,
  };

  const musicGenreData = {
    "Pop": 30,
    "Hip-hop": 25,
    "Rock": 15,
    "Jazz": 10,
    "Classical": 20,
  };

  // Calculate total for percentages
  const totalTrends = topTrends.reduce((sum, [, count]) => sum + count, 0);

  // Prepare chart data for line chart (time-series data)
  const lineChartData = {
    labels: Object.keys(timeSeriesData),
    datasets: [
      {
        label: "Average Video Length (Seconds)",
        data: Object.values(timeSeriesData),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Prepare chart data for bar chart (summary data)
  const barChartData = {
    labels: Object.keys(summaryData),
    datasets: [
      {
        label: "Video Length Summary",
        data: Object.values(summaryData).map((item) => item.mean),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for bar chart (music genre data)
  const musicGenreChartData = {
    labels: Object.keys(musicGenreData),
    datasets: [
      {
        label: "Number of Trends by Music Genre",
        data: Object.values(musicGenreData),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for pie chart (trend type distribution)
  const pieChartData = {
    labels: topTrends.map(([trend]) => trend),
    datasets: [
      {
        label: "Trend Type Percentage",
        data: topTrends.map(([, count]) => ((count / totalTrends) * 100).toFixed(2)),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <h2 className="text-2xl font-semibold">Loading data...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Twitter Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top 5 Trends */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Top 5 Twitter Trends</h2>
          {topTrends.map(([trend, count], index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-xl mb-4">
              <h3 className="text-lg font-semibold text-white">
                {index + 1}. {trend}
              </h3>
              <p className="text-gray-300">Count: {count}</p>
            </div>
          ))}
        </div>

        {/* Pie Chart: Trend Type Percentage Distribution */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Trend Type Percentage Distribution</h2>
          <div className="flex justify-center">
            <div style={{ height: "500px", width: "500px" }}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>

        {/* Line Chart: Time-Series Analysis */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Average Video Length Over Time</h2>
          <Line data={lineChartData} />
        </div>

        {/* Bar Chart: Number of Trends by Music Genre */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Number of Trends by Music Genre</h2>
          <Bar data={musicGenreChartData} />
        </div>

        {/* Bar Chart: Video Length Summary */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Video Length Summary</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
