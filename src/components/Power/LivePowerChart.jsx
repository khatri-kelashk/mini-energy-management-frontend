import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

export default function LivePowerChart({ onStart, onStop, isPolling }) {
  const { chartData, currentPower, loading } = useSelector((s) => s.power);

  // prepare x & series
  const x = chartData.map((p) => {
    // show HH:MM:SS
    return new Date(p.ts).toLocaleTimeString();
  });

  const activeSeries = chartData.map((p) => p.active);
  const reactiveSeries = chartData.map((p) => p.reactive);

  const option = {
    backgroundColor: "transparent",
    grid: { left: 20, right: 20, bottom: 40, top: 20 },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: x,
      boundaryGap: false,
      axisLine: { lineStyle: { color: "#444" } },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#444" } },
    },
    series: [
      {
        name: "Active",
        data: activeSeries,
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2, color: "#ff4d4f" },
      },
      {
        name: "Reactive",
        data: reactiveSeries,
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 1.5, color: "#40a9ff" }
      }
    ]
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-300">Current</div>
          <div className="text-lg font-semibold">
           <span className="text-red-300"> Active: {currentPower?.active ?? "-"} kW </span>•<span className="text-sky-300"> Reactive: {currentPower?.reactive ?? "-"} kvar</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onStart} className="px-3 py-1 bg-green-600 rounded disabled:opacity-50 cursor-pointer" aria-disabled={isPolling}>
            Start
          </button>
          <button onClick={onStop} className="px-3 py-1 bg-red-600 rounded cursor-pointer">
            Stop
          </button>
        </div>
      </div>

      <ReactECharts option={option} style={{ height: 320 }} />
      {loading && <div className="text-sm text-gray-400 mt-2">Loading...</div>}
    </div>
  );
}
