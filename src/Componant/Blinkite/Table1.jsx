import React, { useState, useEffect } from "react";

const SKUDataTable = ({ fetchData }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [cdata, setCData] = useState([]);
  const [skuFilter, setSkuFilter] = useState(""); // 🔍 Filter State
  const [isearch ,setIsSearch] = useState(false)

  const toggleSelection = (name) => {
    setSelectedItems((prev) => {
      const newSelection = new Set(prev);
      newSelection.has(name) ? newSelection.delete(name) : newSelection.add(name);
      return newSelection;
    });
  };

  const query = {
    measures: [
      "blinkit_insights_sku.sales_mrp_sum",
      "blinkit_insights_sku.qty_sold",
      "blinkit_insights_sku.drr_7",
      "blinkit_insights_sku.drr_14",
      "blinkit_insights_sku.drr_30",
      "blinkit_insights_sku.sales_mrp_max",
      "blinkit_insights_sku.month_to_date_sales",
      "blinkit_insights_sku.inv_qty",
    ],
    dimensions: ["blinkit_insights_sku.id", "blinkit_insights_sku.name"],
    timeDimensions: [
      {
        dimension: "blinkit_insights_sku.created_at",
        dateRange: ["2025-02-01", "2025-02-28"],
        granularity: "month",
      },
    ],
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const chartData = await fetchData(query);
        if (Array.isArray(chartData)) {
          setCData(chartData);
        } else {
          console.error("Invalid data format:", chartData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [fetchData]);

  // 🔍 Filter SKU Data Based on SKU Name Input
  const filteredData = cdata.filter((item) =>
    item["blinkit_insights_sku.name"].toLowerCase().includes(skuFilter.toLowerCase())
  );

  //Compute Totals for Filtered Data
  const totalSalesMRP = filteredData.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_sku.sales_mrp_sum"]) || 0), 0);
  const totalQtySold = filteredData.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_sku.qty_sold"]) || 0), 0);
  const totalDrr7 = filteredData.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_sku.drr_7"]) || 0), 0);
  const totalDrr14 = filteredData.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_sku.drr_14"]) || 0), 0);
  const totalDrr30 = filteredData.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_sku.drr_30"]) || 0), 0);
  const totalMaxSalesMRP = filteredData.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_sku.sales_mrp_max"]) || 0), 0);
  const totalMtdSales = filteredData.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_sku.month_to_date_sales"]) || 0), 0);
  const totalInventory = filteredData.reduce((sum, item) => sum + (parseFloat(item["blinkit_insights_sku.inv_qty"]) || 0), 0);


  const handelSow = () => {
    setIsSearch((isearch) => !isearch)
    setSkuFilter("")
  }
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-xl font-semibold">
          SKU Level Data
          <span className="text-xs block">Analytics for all your SKUs</span>
        </h2>
        <div className="flex gap-2">
          {isearch && <input
            type="text"
            placeholder="Search SKU Name..."
            value={skuFilter}
            onChange={(e) => setSkuFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-green-200"
          />}
          <button
            className="bg-green-700 text-white rounded-lg px-3 py-2"
            onClick={handelSow} // Reset Filter
          >
             Filter <i className="fa-solid fa-chevron-down ml-2"></i>
          </button>
        </div>
      </div>

      <div className="table1 max-h-96 overflow-y-auto relative">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="border p-2">Select</th>
              <th className="border p-2">SKU ID</th>
              <th className="border p-2">SKU Name</th>
              <th className="border p-2">Sales MRP</th>
              <th className="border p-2">Quantity Sold</th>
              <th className="border p-2">DRR 7</th>
              <th className="border p-2">DRR 14</th>
              <th className="border p-2">DRR 30</th>
              <th className="border p-2">Max Sales MRP</th>
              <th className="border p-2">MTD Sales</th>
              <th className="border p-2">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item["blinkit_insights_sku.id"]} 
                    className={`border-b ${selectedItems.has(item["blinkit_insights_sku.name"]) ? "bg-green-200" : ""}`}
                >
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item["blinkit_insights_sku.name"])}
                      onChange={() => toggleSelection(item["blinkit_insights_sku.name"])}
                    />
                  </td>
                  <td className="border p-2">{item["blinkit_insights_sku.id"]}</td>
                  <td className="border p-2">{item["blinkit_insights_sku.name"]}</td>
                  <td className="border p-2">₹{parseFloat(item["blinkit_insights_sku.sales_mrp_sum"] || 0).toFixed(2)}</td>
                  <td className="border p-2">{parseFloat(item["blinkit_insights_sku.qty_sold"] || 0).toLocaleString()}</td>
                  <td className="border p-2">{parseFloat(item["blinkit_insights_sku.drr_7"] || 0).toFixed(2)}</td>
                  <td className="border p-2">{parseFloat(item["blinkit_insights_sku.drr_14"] || 0).toFixed(2)}</td>
                  <td className="border p-2">{parseFloat(item["blinkit_insights_sku.drr_30"] || 0).toFixed(2)}</td>
                  <td className="border p-2">₹{parseFloat(item["blinkit_insights_sku.sales_mrp_max"] || 0).toFixed(2)}</td>
                  <td className="border p-2">₹{parseFloat(item["blinkit_insights_sku.month_to_date_sales"] || 0).toFixed(2)}</td>
                  <td className="border p-2">{parseFloat(item["blinkit_insights_sku.inv_qty"] || 0).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-4">No data available</td>
              </tr>
            )}
          </tbody>
          {/* Sticky Footer Row */}
          <tfoot className="sticky bottom-0 bg-gray-200 z-10 ">
              <tr className="font-bold border">
                <td className="border p-2">-</td>
                <td className="border p-2">Total</td>
                <td className="border p-2">-</td>
                <td className="border p-2">₹{totalSalesMRP.toLocaleString()}</td>
                <td className="border p-2">{totalQtySold.toLocaleString()}</td>
                <td className="border p-2">{totalDrr7.toLocaleString()}</td>
                <td className="border p-2">{totalDrr14.toLocaleString()}</td>
                <td className="border p-2">{totalDrr30.toLocaleString()}</td>
                <td className="border p-2">₹{totalMaxSalesMRP.toLocaleString()}</td>
                <td className="border p-2">₹{totalMtdSales.toLocaleString()}</td>
                <td className="border p-2">{totalInventory.toLocaleString()}</td>
              </tr>
            </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SKUDataTable;
