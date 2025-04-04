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

const SoldQuantityChart = ({ fetchData }) => {
  const [cdata, setCData] = useState(null);

  // Cube.js query for February 2025
  const query = {
    measures: ["blinkit_insights_sku.qty_sold"],
    timeDimensions: [
      {
        dimension: "blinkit_insights_sku.created_at",
        granularity: "day",
        dateRange: ["2025-02-01", "2025-02-28"],
      },
    ],
    order: {
      "blinkit_insights_sku.created_at": "asc",
    },
  };

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData(query);
      if (Array.isArray(result)) {
        const labels = result.map((item) =>
          new Date(item["blinkit_insights_sku.created_at.day"]).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          })
        );

        const qtySold = result.map((item) => item["blinkit_insights_sku.qty_sold"]);

        setCData({
          labels,
          datasets: [
            {
              label: "Quantity Sold (Feb 2025)",
              data: qtySold,
              borderColor: "#15803d",
              backgroundColor: "rgba(21, 128, 61, 0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      }
    };

    loadData();
  }, []);

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

  const total = Array.isArray(cdata?.datasets?.[0]?.data)
  ? cdata.datasets[0].data
      .map((val) => Number(val)) // convert each string to a number
      .reduce((a, b) => a + b, 0)
  : 0;

  return (
    <div className="w-full h-[40vh] p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-md font-semibold text-gray-700">Total Quantity Sold</h2>
        <i className="fa-solid fa-circle-question text-gray-400"></i>
      </div>
      <div className="flex items-center justify-between pb-5">
        <p className="text-2xl font-bold text-start">
        <p>{total.toFixed(2)}</p>
        </p>
        <p className="text-green-600 text-sm flex items-end justify-between flex-col">
          ↑ 2.4% <span className="text-gray-500">vs last month</span>
        </p>
      </div>
      {cdata ? <Line data={cdata} options={options} /> : <p>Loading chart...</p>}
      <div className="flex justify-start gap-5 text-xs text-gray-600 mt-3">
        <div className="flex items-center text-xl pt-2">
          <span className="w-2 h-2 bg-green-600 rounded-full inline-block mr-1"></span> February 2025
        </div>
      </div>
    </div>
  );
};

export default SoldQuantityChart;
