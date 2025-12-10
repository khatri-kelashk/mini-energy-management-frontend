import React from "react";
import ReactECharts from "echarts-for-react";

export default function EnergyChart({ dates = [], solar = [], grid = [] }) {
  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: ["Solar", "Grid"] },
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value", name: "kWh" },
    series: [
      { name: "Solar", type: "bar", stack: "total", data: solar },
      { name: "Grid", type: "bar", stack: "total", data: grid },
    ],
  };

  return <ReactECharts option={option} style={{ height: 360 }} />;
}
