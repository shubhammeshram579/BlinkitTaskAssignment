import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const SalesQuantityChart = ({query, fetchData,dataAPI }) => {

  const [cdata ,setCData] = useState()


  console.log("dataAPI",dataAPI)

  useEffect(() => {
    const loadData = async () => {
      const cahrtdata = await  fetchData(query)
      
      if (Array.isArray(cahrtdata)) {
        setCData(cahrtdata);
      }

    }

    loadData();

  },[])



  const data = {
    labels: ["09", "10", "11", "12", "13", "14", "15"],
    datasets: [
      {
        label: "This Month",
        data: [2.0, 2.5, 3.2, 4.1, 3.8, 3.5, 4.7],
        borderColor: "#15803d",
        backgroundColor: "rgba(21, 128, 61, 0.2)",
        tension: 0.5,
        fill: true,
      },
      {
        label: "Last Month",
        data: [2.2, 2.3, 2.5, 2.9, 3.1, 2.8, 3.2],
        borderColor: "#dc2626",
        borderDash: [5, 5],
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="w-full h-[40vh] p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between pb-5">
        <h2 className="text-md font-semibold text-gray-700">Total Quentity sold</h2>
        <i class="fa-solid fa-circle-question"></i>
        </div>
        <div className="flex items-center justify-between pb-5">
      <p className="text-2xl font-bold text-start">125.49</p>
      <p className="text-green-600 text-sm flex items-end justify-between flex-col">↑ 2.4% <span className="text-gray-500">vs 119.69 last month</span></p>
      </div>
      <Line data={data} options={options} />
      <div className="flex justify-start gap-5 text-xs text-gray-600 mt-3">
        <div className="flex items-center text-xl pt-2">
          <span className="w-2 h-2 bg-green-600 rounded-full inline-block mr-1"></span> This Month
        </div>
        <div className="flex items-center text-xl pt-2">
          <span className="w-2 h-2 bg-red-600 rounded-full inline-block mr-1"></span> Last Month
        </div>
      </div>
    </div>
  );
};

export default SalesQuantityChart;