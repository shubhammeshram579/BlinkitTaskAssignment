import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopCitiesChart = ({ fetchData }) => {
  const [cdata, setCData] = useState(null);
  const [labels, setLabels] = useState(null);
  const [amounts, setAmounts] = useState(null);
  const [totalA, setTotalA] = useState(null);
  const [comparisonRates, setComparisonRates] = useState(null); // New State

  const query = {
    measures: ["blinkit_insights_city.sales_mrp_sum"],
    dimensions: ["blinkit_insights_city.name"],
    timeDimensions: [
      {
        dimension: "blinkit_insights_city.created_at",
        dateRange: ["2025-02-01", "2025-02-28"],
      },
    ],
    order: {
      "blinkit_insights_city.sales_mrp_sum": "desc",
    },
    limit: 4,
  };

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData(query);
      if (Array.isArray(result)) {
        const cityNames = result.map(
          (item) => item["blinkit_insights_city.name"]
        );
        const salesAmounts = result.map((item) =>
          parseFloat(item["blinkit_insights_city.sales_mrp_sum"])
        );

        const total = salesAmounts.reduce((a, b) => a + b, 0);
        setTotalA(total);

        // Calculate Comparison Rates
        const topCitySales = Math.max(...salesAmounts); // Highest sales amount
        const comparisonRates = salesAmounts.map(
          (sales) => ((sales / topCitySales) * 100).toFixed(2) // Convert to percentage
        );

        setLabels(cityNames);
        setAmounts(salesAmounts);
        setComparisonRates(comparisonRates);
      }

      setCData(result);
    };

    loadData();
  }, [fetchData]);

  console.log(totalA);

  const data = {
    labels: labels,
    datasets: [
      {
        data: amounts, // Percentage values
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
      <h2 className="text-lg font-semibold text-gray-700 text-start mb-[-50px]">
        Top Cities
      </h2>
      <Doughnut data={data} options={options} />
      <div className="text-center mt-[-139px]">
        <p>Total</p>
        <p className="text-xl font-bold">₹{totalA}</p>
        <p className="text-sm text-green-600">↑ 2.2%</p>
      </div>
      {Array.isArray(cdata) &&
        cdata.map((items, index) => (
          <ul key={index} className="mt-3 text-sm text-gray-600">
            <li className="flex justify-between items-center">
              <span className="text-indigo-600 text-start">
                {items["blinkit_insights_city.name"]}
              </span>
              ₹
              {parseFloat(items["blinkit_insights_city.sales_mrp_sum"])}
              <span className="text-green-600">
                ↑ {comparisonRates[index]}% {/* Display Comparison Rate */}
              </span>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default TopCitiesChart;
