import React, { useEffect, useState } from "react";
import SalesQuantityChart from "./LineChart.jsx";
import TopCitiesChart from "./PieChartCity.jsx";
import SoldQuantityChart from "./TotalQty.jsx";
import SKUDataTable from "./Table1.jsx";
import CityDataTable from "./Table2.jsx";

import { jsonData } from "./Data/Data.js";

import axios from "axios";

const BlickitHome = () => {
  const [cards, setCards] = useState([]);

  const [queryData, setQueryData] = useState(null);

  useEffect(() => {
    const fetchJSONData = async () => {
      try {
        const response = await jsonData.cards.filter((card) => {
          return card;
        });

        setCards(response);
      } catch (error) {
        console.error("Error fetching JSON data", error);
      }
    };

    fetchJSONData();
  }, []);

  const fetchData = async (query) => {
    try {
      const parsedQuery = JSON.parse(query);
      console.log(parsedQuery);

      const response = await axios.post(
        "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1/load",
        { query: parsedQuery[0] }, // Ensure it's wrapped properly
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CUBEJS_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full API Response:", response.data);

      setQueryData(response.data);

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
            <p>Aug/01/2024 - Aug/03/2024</p>
          </div>
        </div>
        <h1 className="text-start pl-3 pb-2">Blikit</h1>

        {cards.map((ite) => (
          <div key={ite.id}>
            <div className="flex items-center justify-evenly gap-6">
            {ite.visualizationType === "linechart1" && (
              <SalesQuantityChart dataAPI={queryData} query={ite.query} fetchData={fetchData} />
            )}
            {ite.visualizationType === "linechart1" && (
              <SoldQuantityChart dataAPI={queryData} query={ite.query} fetchData={fetchData} />
            )}
            {ite.visualizationType === "linechart1" && (
              <TopCitiesChart dataAPI={queryData} query={ite.query} fetchData={fetchData} />
            )}
            </div>
            <div>
            {ite.visualizationType === "linechart1" && (
              <SKUDataTable dataAPI={queryData} query={ite.query} fetchData={fetchData} />
            )}
            {ite.visualizationType === "linechart1" &&  (
              <CityDataTable dataAPI={queryData} query={ite.query} fetchData={fetchData} />
            )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlickitHome;