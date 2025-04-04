import React, { useState, useEffect } from "react";

const CityDataTable = ({ fetchData }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [cdata, setCData] = useState([]);

  const toggleSelection = (name) => {
    setSelectedItems((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(name)) {
        newSelection.delete(name);
      } else {
        newSelection.add(name);
      }
      return newSelection;
    });
  };

  const query = {
    measures: [
      "blinkit_insights_city.sales_mrp_sum",
      "blinkit_insights_city.qty_sold",
      "blinkit_insights_city.drr_7",
      "blinkit_insights_city.drr_14",
      "blinkit_insights_city.drr_30",
      "blinkit_insights_city.sales_mrp_max",
      "blinkit_insights_city.month_to_date_sales",
      "blinkit_insights_city.be_inv_qty",
      "blinkit_insights_city.fe_inv_qty",
      "blinkit_insights_city.inv_qty",
      "blinkit_insights_city.days_of_inventory_14",
      "blinkit_insights_city.days_of_inventory_max"
    ],
    dimensions: ["blinkit_insights_city.id", "blinkit_insights_city.name"],
    timeDimensions: [
      {
        dimension: "blinkit_insights_city.created_at",
        dateRange: ["2025-02-01", "2025-02-28"],
        granularity: "month"
      }
    ]
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const chartData = await fetchData(query);
        console.log("Fetched Data:", chartData);

        if (Array.isArray(chartData)) {
          setCData(chartData);
        } else {
          console.error("Invalid data format received:", chartData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [fetchData]);


  // Convert string values to numbers and sum them up
const totalSalesMRP = cdata.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_city.sales_mrp_sum"]) || 0), 0);
const totalQtySold = cdata.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_city.qty_sold"]) || 0), 0);
const totalDrr7 = cdata.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_city.drr_7"]) || 0), 0);
const totalDrr14 = cdata.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_city.drr_14"]) || 0), 0);
const totalDrr30 = cdata.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_city.drr_30"]) || 0), 0);
const totalMtdSales = cdata.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_city.month_to_date_sales"]) || 0), 0);
const totalInventory = cdata.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_city.inv_qty"]) || 0), 0);


  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between p-5 border-b">
        <h2 className="text-lg font-semibold flex flex-col">
          City Level Data
          <span className="text-sm text-gray-500">Analytics for all Cities</span>
        </h2>
        <button className="bg-green-700 text-white rounded-lg px-3 py-2 text-sm flex items-center">
          Filter <i className="fa-solid fa-chevron-down ml-2"></i>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="border p-3 text-left">Select</th>
              <th className="border p-3 text-left">City ID</th>
              <th className="border p-3 text-left">City Name</th>
              <th className="border p-3 text-left">Sales MRP</th>
              <th className="border p-3 text-left">Qty Sold</th>
              <th className="border p-3 text-left">DRR 7</th>
              <th className="border p-3 text-left">DRR 14</th>
              <th className="border p-3 text-left">DRR 30</th>
              <th className="border p-3 text-left">MTD Sales</th>
              <th className="border p-3 text-left">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {cdata.length > 0 ? (
              cdata.map((item) => (
                <tr
                  key={item["blinkit_insights_city.id"]}
                  className={`border-b ${selectedItems.has(item["blinkit_insights_city.name"]) ? "bg-green-200" : ""}`}
                >
                  <td className="border p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item["blinkit_insights_city.name"])}
                      onChange={() => toggleSelection(item["blinkit_insights_city.name"])}
                    />
                  </td>
                  <td className="border p-3">{item["blinkit_insights_city.id"]}</td>
                    <td className="border p-3">{item["blinkit_insights_city.name"]}</td>
                    <td className="border p-3">
                      ₹{parseFloat(item["blinkit_insights_city.sales_mrp_sum"] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="border p-3">
                      {parseFloat(item["blinkit_insights_city.qty_sold"] || 0).toLocaleString()}
                    </td>
                    <td className="border p-3">
                      {parseFloat(item["blinkit_insights_city.drr_7"] || 0).toFixed(2)}
                    </td>
                    <td className="border p-3">
                      {parseFloat(item["blinkit_insights_city.drr_14"] || 0).toFixed(2)}
                    </td>
                    <td className="border p-3">
                      {parseFloat(item["blinkit_insights_city.drr_30"] || 0).toFixed(2)}
                    </td>
                    <td className="border p-3">
                      ₹{parseFloat(item["blinkit_insights_city.month_to_date_sales"] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="border p-3">
                      {parseFloat(item["blinkit_insights_city.inv_qty"] || 0).toLocaleString()}
                    </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
            {cdata.length > 0 && (
              <tr className="font-bold border-t bg-gray-200">
                <td className="border p-3">-</td>
                <td className="border p-3">Total</td>
                <td className="border p-3">-</td>
                <td className="border p-3">₹{totalSalesMRP.toLocaleString()}</td>
                <td className="border p-3">{totalQtySold.toLocaleString()}</td>
                <td className="border p-3">{totalDrr7.toLocaleString()}</td>
                <td className="border p-3">{totalDrr14.toLocaleString()}</td>
                <td className="border p-3">{totalDrr30.toLocaleString()}</td>
                <td className="border p-3">₹{totalMtdSales.toLocaleString()}</td>
                <td className="border p-3">{totalInventory.toLocaleString()}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CityDataTable;
