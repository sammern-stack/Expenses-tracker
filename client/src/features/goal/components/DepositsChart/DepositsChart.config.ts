import type { ChartData, ChartOptions } from "chart.js";

export const monthlyDepositsLabels: [string, string][] = [
  ["1200", "Jan"],
  ["1900", "Feb"],
  ["3000", "Mar"],
  ["2500", "Apr"],
  ["3200", "May"],
  ["4000", "Jun"],
  ["2800", "Jul"],
  ["3600", "Aug"],
  ["4100", "Sep"],
  ["3800", "Oct"],
  ["4500", "Nov"],
  ["5200", "Dec"],
];

export const depositsChartData: ChartData<"bar", number[], [string, string]> = {
  labels: monthlyDepositsLabels,
  datasets: [
    {
      data: [
        1200, 1900, 3000, 2500, 3200, 4000, 2800, 3600, 4100, 3800, 4500, 5200,
      ],
      borderColor: "rgba(255, 87, 34, 1)",
      backgroundColor: "rgba(255, 87, 34, 0.6)",
      borderRadius: 16,
      borderSkipped: false,
    },
  ],
};

export const depositsChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: { grid: { display: false }, ticks: { display: false } },
    y: {
      max: 6000,
      grid: { display: false },
      ticks: { display: false },
    },
  },
};
