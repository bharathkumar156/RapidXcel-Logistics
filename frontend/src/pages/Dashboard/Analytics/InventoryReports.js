import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { toast } from "react-toastify";

const InventoryReports = ({ startDate, endDate }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const stocksBarChartRef = useRef(null);
  const stocksPieChartRef = useRef(null);

  useEffect(() => {
    if (startDate && endDate) {
      updateCharts();
    }
  }, [startDate, endDate]);

  const updateCharts = async () => {
    // Destroy existing charts if they exist
    if (stocksPieChartRef.current) {
      stocksPieChartRef.current.destroy();
    }
    if (stocksBarChartRef.current) {
      stocksBarChartRef.current.destroy();
    }

    const { stock_levels, supplier_stock_distribution } =
      await fetchAnalyticsData(startDate, endDate);

    if (stock_levels && stock_levels.products.length > 0) {
      // Generate unique background colors
      const backgroundColors = stock_levels.products.map((_, index) => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
      });

      // Pie chart (Stocks distribution)
      const ctxPie = document.getElementById("stocksPieChart").getContext("2d");
      stocksPieChartRef.current = new Chart(ctxPie, {
        type: "pie",
        data: {
          labels: stock_levels.products,
          datasets: [
            {
              label: "Orders",
              data: stock_levels.quantities,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) =>
                color.replace("0.6", "1")
              ),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Stock Levels & Replenishment Needs",
              position: "bottom",
              padding: 20,
            },
            legend: {
              display: false, // Hide the legend
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.label + ": " + tooltipItem.raw + " pieces";
                },
              },
            },
          },
        },
      });
    } else {
      toast.error(
        "No data available for the selected date range for Stock Levels."
      );
    }

    if (
      supplier_stock_distribution &&
      supplier_stock_distribution.suppliers.length > 0
    ) {
      // Bar chart (Supplier Stock Distribution)
      const ctxBar = document.getElementById("stocksBarChart").getContext("2d");
      stocksBarChartRef.current = new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: supplier_stock_distribution.suppliers,
          datasets: [
            {
              label: "Products",
              data: supplier_stock_distribution.total_products,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Supplier Stock Distribution",
              position: "bottom",
              padding: 20,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Number of products" },
            },
            x: {
              title: { display: true, text: "Suppliers" },
            },
          },
        },
      });
    } else {
      toast.error(
        "No data available for the selected date range for Supplier Stock Distribution."
      );
    }
  };

  const fetchAnalyticsData = async (startDate, endDate) => {
    const response = await fetch(
      `${BACKEND_URL}/api/inventory-reports?startDate=${startDate}&endDate=${endDate}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  };
  return (
    <section id="inventory-reports">
      <h2>Inventory Reports</h2>
      <div className="charts d-flex gap-4">
        <div className="chart-container" style={{ height: "400px" }}>
          <canvas id="stocksPieChart" className="mx-auto"></canvas>
        </div>
        <div className="chart-container" style={{ height: "400px" }}>
          <canvas id="stocksBarChart"></canvas>
        </div>
      </div>
    </section>
  );
};

export default InventoryReports;
