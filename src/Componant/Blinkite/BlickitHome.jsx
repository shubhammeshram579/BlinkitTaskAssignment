import React, { useEffect, useState } from "react";
import SalesQuantityChart from "./LineChart.jsx";
import TopCitiesChart from "./PieChartCity.jsx";
import SoldQuantityChart from "./TotalQty.jsx";
import SKUDataTable from "./Table1.jsx";
import CityDataTable from "./Table2.jsx";
import axios from "axios";

const BlickitHome = () => {

  

  const fetchData = async (query) => {
    try {
      const response = await axios.post(
        "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1/load",
        { query }, // directly pass the object
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CUBEJS_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full API Response:", response.data);

      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };



  return (
    <>
      <div className="bg-zinc-200">
        <div className="flex items-center justify-between px-2 py-5">
          <h1>quick commence</h1>
          <div className="flex items-center justify-between gap-2">
            <i class="fa-solid fa-toggle-off"></i>
            <i class="fa-solid fa-calendar-days"></i>
            <p>Feb/01/2024 - Feb/28/2024</p>
          </div>
        </div>
        <h1 className="text-start pl-3 pb-2">Blikit</h1>
        <div className="flex items-center justify-evenly gap-6">
          <SalesQuantityChart fetchData={fetchData} />

          <SoldQuantityChart fetchData={fetchData} />

          <TopCitiesChart fetchData={fetchData} />
        </div>
        <div>
          <SKUDataTable fetchData={fetchData} />

          <CityDataTable fetchData={fetchData} />
        </div>
      </div>
    </>
  );
};

export default BlickitHome;
