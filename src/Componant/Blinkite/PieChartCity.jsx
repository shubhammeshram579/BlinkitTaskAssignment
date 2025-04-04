import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopCitiesChart = () => {
  const data = {
    labels: ["New Delhi", "Mumbai", "West Bengal", "Others"],
    datasets: [
      {
        data: [35, 23, 21, 9], // Percentage values
        backgroundColor: ["#6A5ACD", "#FF6347", "#FFD700", "#D3D3D3"],
        borderWidth: 1,
        cutout: "80%", // Shows only bottom 50%
        rotation: 270,
        circumference: 180,
      },
    ],
  };

  const options = {
    cutout: "90%", // Donut style
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 text-start mb-[-50px]">Top Cities</h2>
      <Doughnut data={data} options={options} />
      <div className="text-center mt-[-139px]">
        <p>Total</p>
        <p className="text-xl font-bold">₹68.2L</p>
        <p className="text-sm text-green-600">↑ 2.2%</p>
      </div>
      <ul className="mt-3 text-sm text-gray-600">
        <li className="flex justify-between items-center"><span className="text-indigo-600 text-start">New Delhi</span> ₹26.5L (35%) <span className="text-green-600">↑ 1.2%</span></li>
        <li className="flex justify-between items-center"><span className="text-red-600 text-start">Mumbai</span> ₹36.4L (23%) <span className="text-red-600">↓ 3.3%</span></li>
        <li className="flex justify-between items-center"><span className="text-yellow-600 text-start">West Bengal</span> ₹12.2L (21%) <span className="text-red-600">↓ 2.3%</span></li>
        <li className="flex justify-between items-center"><span className="text-gray-600 text-start">Others</span> ₹24.3L (9%) <span className="text-green-600">↑ 1.09%</span></li>
      </ul>
    </div>
  );
};

export default TopCitiesChart;
