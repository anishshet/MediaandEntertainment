import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

function TrendingInstagram() {
  const [topTrends, setTopTrends] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState(null);
  const [musicGenreData, setMusicGenreData] = useState(null); // Added music genre state
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Fetch summary data
    axios.get("http://127.0.0.1:5000/api/summary")
      .then(response => setSummaryData(response.data))
      .catch(error => console.error("Error fetching summary data:", error));

    // Fetch time-series data
    axios.get("http://127.0.0.1:5000/api/time_series")
      .then(response => setTimeSeriesData(response.data))
      .catch(error => console.error("Error fetching time-series data:", error));

    // Fetch music genre data
    axios.get("http://127.0.0.1:5000/api/music_genre")
      .then(response => setMusicGenreData(response.data))
      .catch(error => console.error("Error fetching music genre data:", error))
      .finally(() => setLoading(false)); // End loading state when data is fetched

    axios.get("http://127.0.0.1:5000/api/trend_type")
      .then((response) => {
        const trendData = response.data;

        // Count occurrences of each trend
        const trendCounts = {};
        Object.values(trendData).forEach((trend) => {
          trendCounts[trend] = (trendCounts[trend] || 0) + 1;
        });

        // Convert to array and sort by count
        const sortedTrends = Object.entries(trendCounts)
          .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
          .slice(0, 5); // Get top 5 trends

        setTopTrends(sortedTrends);
      })
      .catch((error) => console.error("Error fetching trends:", error))
      .finally(() => setLoading(false));
  }, []);

  // Calculate total for percentages
  const totalTrends = topTrends.reduce((sum, [, count]) => sum + count, 0);

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

  // Prepare chart data for bar chart (summary data)
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

  // Prepare chart data for bar chart (music genre)
  const musicGenreChartData = {
    labels: Object.keys(musicGenreData || {}),
    datasets: [
      {
        label: 'Number of Trends by Music Genre',
        data: Object.values(musicGenreData || {}),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for pie chart (trend type distribution)
  const pieChartData = {
    labels: topTrends.map(([trend]) => trend),
    datasets: [
      {
        label: 'Trend Type Percentage',
        data: topTrends.map(([, count]) => ((count / totalTrends) * 100).toFixed(2)),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for the pie chart (smaller size and labels)
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white', // Adjust the legend text color
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

      {/* Grid Layout for 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top 5 Trends */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Top 5 Trend Types</h2>
          {topTrends.map(([trend, count], index) => (
            <div key={index} className="bg-gray-700 p-8 rounded-xl mb-4">
              <h3 className="text-lg font-semibold text-white">{index + 1}. {trend}</h3>
              {/* <p className="text-gray-300">Count: {count}</p> */}
            </div>
          ))}
        </div>

{/* Pie Chart: Trend Type Percentage Distribution */}
<div className="bg-gray-800 p-6 rounded-xl shadow-lg">
  <h2 className="text-xl font-semibold mb-4 ">Trend Type Percentage Distribution</h2>
  {topTrends && (
    <div className="flex justify-center">
      <div style={{ height: '500px', width: '500px' }}> {/* Increased size of the chart */}
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
    </div>
  )}
</div>

        {/* Line Chart: Time-Series Analysis */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Average Video Length Over Time</h2>
          {timeSeriesData && <Line data={lineChartData} />}
        </div>

        {/* Bar Chart: Summary Data by Music Genre
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Video Length by Music Genre</h2>
          {summaryData && <Bar data={barChartData} />}
        </div> */}

        {/* Bar Chart: Number of Trends by Music Genre */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Number of Trends by Music Genre</h2>
          {musicGenreData && <Bar data={musicGenreChartData} />}
        </div>

      </div>
    </div>
  );
}

export default TrendingInstagram;
