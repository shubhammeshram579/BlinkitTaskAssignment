import React, { useState,useEffect } from "react";

const data = [
  {
    name: "Delhi",
    sales: 93132.12,
    outOfStock: "1.68%",
    totalInventory: 931.9,
    avgRank: 3.2,
    traffic: 12033,
    impressions: 25005,
  },
  {
    name: "Bengaluru",
    sales: 8526.32,
    outOfStock: "6.79%",
    totalInventory: 679,
    avgRank: 7,
    traffic: 3005,
    impressions: 4231,
  },
  {
    name: "SKU 3",
    sales: 3913,
    outOfStock: "1.68%",
    totalInventory: 931.9,
    avgRank: 11,
    traffic: 1931.9,
    impressions: 931.9,
  },
  {
    name: "SKU 4",
    sales: 0,
    outOfStock: "0%",
    totalInventory: 0,
    avgRank: 0,
    traffic: 0,
    impressions: 0,
  },
];

const  CityDataTable = ({query, fetchData,dataAPI }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [cdata ,setCData] = useState(null)

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


  useEffect(() => {
    const loadData = async () => {
      const cahrtdata = await  fetchData(query)
      
      if (Array.isArray(cahrtdata)) {
        setCData(cahrtdata);
      }

    }

    loadData();

  },[])

  return (
    <div className="p-4">
    <div className="flex items-center justify-between p-5">
      <h2 className="text-xl font-semibold mb-4 text-start flex flex-col">City Level Data <span className="text-xs">Analytics for all your cities</span></h2>
      <button className="bg-green-700 rounded-lg px-3 py-2">Filter1 <i class="fa-solid fa-chevron-down"></i></button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Select</th>
            <th className="border p-2">City Name</th>
            <th className="border p-2">Sales</th>
            <th className="border p-2">Out of Stock</th>
            <th className="border p-2">Total Inventory</th>
            <th className="border p-2">Average Rank</th>
            <th className="border p-2">Est. Traffic</th>
            <th className="border p-2">Est. Impressions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.name}
              className={`border ${selectedItems.has(item.name) ? "bg-green-100" : ""}`}
            >
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.name)}
                  onChange={() => toggleSelection(item.name)}
                />
              </td>
              <td className="border p-2 font-semibold text-green-700">{item.name}</td>
              <td className="border p-2">₹{item.sales.toLocaleString()}</td>
              <td className="border p-2">{item.outOfStock}</td>
              <td className="border p-2">{item.totalInventory}</td>
              <td className="border p-2">{item.avgRank}</td>
              <td className="border p-2">{item.traffic}</td>
              <td className="border p-2">{item.impressions}</td>
            </tr>
          ))}
          <tr className="font-bold border-t bg-gray-200">
            <td className="border p-2">-</td>
            <td className="border p-2">Total</td>
            <td className="border p-2">₹{data.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</td>
            <td className="border p-2">16%</td>
            <td className="border p-2">2931</td>
            <td className="border p-2">8.3</td>
            <td className="border p-2">61,985</td>
            <td className="border p-2">2,61,768</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default CityDataTable