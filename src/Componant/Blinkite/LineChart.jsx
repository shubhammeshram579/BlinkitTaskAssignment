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

const SalesQuantityChart = ({ fetchData }) => {
  const [cdata, setCData] = useState(null);

  // 🟢 Replace 'sales_mrp' with the correct measure name if needed
  const query = {
    measures: ["blinkit_insights_sku.sales_mrp_sum"],
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

        const salesMrp = result.map((item) => Number(item["blinkit_insights_sku.sales_mrp_sum"]));

        setCData({
          labels,
          datasets: [
            {
              label: "Sales MRP (Feb 2025)",
              data: salesMrp,
              borderColor: "#2563eb",
              backgroundColor: "rgba(37, 99, 235, 0.2)",
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

  console.log("cdataSales" ,cdata)

  const total = Array.isArray(cdata?.datasets?.[0]?.data)
    ? cdata.datasets[0].data.reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="w-full h-[40vh] p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-md font-semibold text-gray-700">Total Sales MRP</h2>
        <i className="fa-solid fa-circle-question text-gray-400"></i>
      </div>
      <div className="flex items-center justify-between pb-5">
        <p className="text-2xl font-bold text-start">
          ₹ {total.toFixed(2)}
        </p>
        <p className="text-blue-600 text-sm flex items-end justify-between flex-col">
          ↑ 3.1% <span className="text-gray-500">vs last month</span>
        </p>
      </div>
      {cdata ? <Line data={cdata} options={options} /> : <p>Loading chart...</p>}
      <div className="flex justify-start gap-5 text-xs text-gray-600 mt-3">
        <div className="flex items-center text-xl pt-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full inline-block mr-1"></span> February 2025
        </div>
      </div>
    </div>
  );
};

export default SalesQuantityChart;
