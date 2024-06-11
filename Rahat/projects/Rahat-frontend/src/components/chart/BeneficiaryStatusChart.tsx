// src/BeneficiaryStatusChart.js
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { SERVER_URL } from "@/constants";

const BeneficiaryStatusChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Beneficiary Status Distribution",
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}api/v1/beneficiary/status-distribution`);
        const data = response.data;

        const labels = data.map((item: any) => item.status);
        const counts = data.map((item: any) => item.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Beneficiary Status Distribution",
              data: counts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching the beneficiary status distribution:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "400px" }}>
      <Pie data={chartData} />
    </div>
  );
};

export default BeneficiaryStatusChart;
