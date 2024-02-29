import type { ChartOptions, ScriptableContext } from "chart.js";

import { handleTicksXAxis, handleTicksYAxis } from "./compareGeneral";

export function priceComparisonGradient(context: ScriptableContext<"line">) {
  const chart = context.chart;
  const { ctx, chartArea } = chart;

  if (!chartArea) return;

  let width: number | undefined;
  let height: number | undefined;
  let gradient: CanvasGradient | undefined;

  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.top - chartArea.bottom;

  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;

    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(1, "rgba(52, 211, 153, 0.8)");
    gradient.addColorStop(0, "rgba(19, 78, 74, 0.0)");
  }

  return gradient;
}

export const priceComparisonOptions: ChartOptions<"line"> = {
  elements: {
    point: {
      radius: 0,
      hoverRadius: 10,
      hoverBorderWidth: 2,
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        color: "#27272a",
      },
      ticks: {
        callback: function (val, idx) {
          const label = this.getLabelForValue(val as number);
          return handleTicksXAxis(label, idx);
        },
      },
    },
    y: {
      grid: {
        color: "#27272a",
      },
      ticks: {
        callback: function (val, idx) {
          return handleTicksYAxis(val as number, idx);
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      align: "end",
    },
    title: {
      display: false,
    },
    tooltip: {
      caretPadding: 14,
      xAlign: "center",
      yAlign: "top",
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  maintainAspectRatio: false,
  responsive: true,
};
