import type { ChartOptions, ScriptableContext } from "chart.js";

import { handleTicksXAxis, handleTicksYAxis } from "./compareGeneral";

export function volumeComparisonGradient(context: ScriptableContext<"bar">) {
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
    gradient.addColorStop(1, "rgba(52, 211, 153, 1)");
    gradient.addColorStop(0, "rgba(19, 78, 74, 0.8)");
  }

  return gradient;
}

export const volumeComparisonOptions: ChartOptions<"bar"> = {
  elements: {
    point: {
      radius: 0,
      hoverRadius: 0,
    },
  },
  scales: {
    x: {
      ticks: {
        callback: function (val, idx) {
          const label = this.getLabelForValue(val as number);
          return handleTicksXAxis(label, idx);
        },
      },
    },
    y: {
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
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  maintainAspectRatio: false,
  responsive: true,
};
