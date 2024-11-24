// src/components/ChartCard.js
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the chart types and scales
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartCard = ({ platform, chartData, onClick }) => {
  const [data, setData] = useState({
    labels: chartData.labels,
    datasets: [
      {
        label: `${platform} Data`,
        data: chartData.data,
        fill: false,
        borderColor: "#4ade80", // Example color for line
        tension: 0.1,
      },
    ],
  });
  const chartRef = useRef(null); // Reference to the chart

  useEffect(() => {
    // Function to simulate moving data (updating the chart every few seconds)
    const interval = setInterval(() => {
      const newData = [...data.datasets[0].data];
      newData.shift(); // Remove the first data point (simulate moving)
      newData.push(Math.floor(Math.random() * 100)); // Add a new random data point

      // Update the chart with new data
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: newData,
          },
        ],
      });
    }, 2000); // Update every 2 seconds (you can change the timing)

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    // Make sure the chart instance is available before updating
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.update();
    }
  }, [data]); // Re-run the effect when the data changes

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${platform} Analytics`,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
        },
      },
    },
    animation: {
      duration: 1000, // Duration of the animation in milliseconds
      easing: "easeInOutQuad", // Easing function for smooth animation
    },
  };

  return (
    <div
      className="bg-[#1F2937] p-6 rounded-lg text-center shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer flex flex-col"
      onClick={() => onClick(platform)}
    >
      <h3 className="text-3xl font-semibold text-white mb-4">{platform}</h3>
      <div className="flex-grow w-full relative rounded-lg overflow-hidden"> {/* Make the chart container take up full space */}
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartCard;
