import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(false);

  // Simulated data for YouTube
  const topTrends = [
    ["#TrendingVideos", 300],
    ["#ViralClips", 250],
    ["#MusicVideos", 200],
    ["#Gaming", 180],
    ["#TechReviews", 150],
  ];

  const summaryData = {
    "Video 1": { mean: 120 },
    "Video 2": { mean: 150 },
    "Video 3": { mean: 200 },
    "Video 4": { mean: 180 },
    "Video 5": { mean: 160 },
  };

  const timeSeriesData = {
    "Jan": 1500,
    "Feb": 1600,
    "Mar": 1800,
    "Apr": 1700,
    "May": 2000,
    "Jun": 2200,
    "Jul": 2500,
    "Aug": 2600,
    "Sep": 2800,
    "Oct": 2900,
    "Nov": 3100,
    "Dec": 3200,
  };

  const videoCategoryData = {
    "Music": 40,
    "Gaming": 30,
    "Education": 20,
    "Tech": 10,
  };

  // Calculate total for percentages
  const totalTrends = topTrends.reduce((sum, [, count]) => sum + count, 0);

  // Prepare chart data for line chart (time-series data for views)
  const lineChartData = {
    labels: Object.keys(timeSeriesData),
    datasets: [
      {
        label: "Views Over Time",
        data: Object.values(timeSeriesData),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Prepare chart data for bar chart (video length summary)
  const barChartData = {
    labels: Object.keys(summaryData),
    datasets: [
      {
        label: "Average Video Length (Seconds)",
        data: Object.values(summaryData).map((item) => item.mean),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for bar chart (video category data)
  const videoCategoryChartData = {
    labels: Object.keys(videoCategoryData),
    datasets: [
      {
        label: "Number of Videos by Category",
        data: Object.values(videoCategoryData),
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
      <h1 className="text-4xl font-bold mb-8 text-center">YouTube Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top 5 Trends */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Top 5 YouTube Trends</h2>
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

        {/* Line Chart: Views Over Time */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Views Over Time</h2>
          <Line data={lineChartData} />
        </div>

        {/* Bar Chart: Number of Videos by Category */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Number of Videos by Category</h2>
          <Bar data={videoCategoryChartData} />
        </div>

        {/* Bar Chart: Average Video Length Summary */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Average Video Length Summary</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
