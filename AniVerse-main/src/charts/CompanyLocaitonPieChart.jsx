import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const CompanyLocationPieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/chocolatedataset.json");
      const data = await response.json();

      const locationCounts = data.reduce((acc, item) => {
        acc[item["Company Location"]] =
          (acc[item["Company Location"]] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(locationCounts);
      const values = Object.values(locationCounts);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4CAF50",
              "#9C27B0",
              "#FF9800",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4CAF50",
              "#9C27B0",
              "#FF9800",
            ],
          },
        ],
      });
    };

    fetchData();
  }, []);

  if (!chartData)
    return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">
        Company Location Distribution
      </h2>
      <Pie data={chartData} />
    </div>
  );
};

export default CompanyLocationPieChart;
