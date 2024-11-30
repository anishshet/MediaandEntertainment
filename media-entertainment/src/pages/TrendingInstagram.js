import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function TrendingInstagram() {
  const [summaryData, setSummaryData] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Fetch summary data
    axios.get("http://127.0.0.1:5000/api/summary")
      .then(response => setSummaryData(response.data))
      .catch(error => console.error("Error fetching summary data:", error));

    // Fetch time-series data
    axios.get("http://127.0.0.1:5000/api/time_series")
      .then(response => setTimeSeriesData(response.data))
      .catch(error => console.error("Error fetching time-series data:", error))
      .finally(() => setLoading(false)); // End loading state when data is fetched
  }, []);

  // Prepare chart data for line chart
  const lineChartData = {
    labels: Object.keys(timeSeriesData || {}),
    datasets: [
      {
        label: 'Average Video Length (Seconds)',
        data: Object.values(timeSeriesData || {}),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Prepare chart data for bar chart
  const barChartData = {
    labels: Object.keys(summaryData || {}),
    datasets: [
      {
        label: 'Video Length Summary',
        data: Object.values(summaryData || {}).map(item => item['mean']),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Loading indicator or error handling
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <h2 className="text-2xl font-semibold">Loading data...</h2>
      </div>
    );
  }

  // Render charts only if data is available
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Media and Entertainment Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Line Chart: Time-Series Analysis */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Average Video Length Over Time</h2>
          {timeSeriesData && <Line data={lineChartData} />}
        </div>

        {/* Bar Chart: Summary Data by Music Genre */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Video Length by Music Genre</h2>
          {summaryData && <Bar data={barChartData} />}
        </div>
      </div>
    </div>
  );
}

export default TrendingInstagram;
