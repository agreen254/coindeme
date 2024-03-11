import type { ChartOptions, ScriptableContext } from "chart.js";

import {
  handleGradientColorStops,
  handleTicksXAxis,
  handleTicksYAxis,
} from "./compareGeneralHelpers";

// https://www.chartjs.org/docs/latest/samples/advanced/linear-gradient.html
export function volumeComparisonGradient(
  context: ScriptableContext<"bar">,
  chartIdx: number = 0
) {
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

    handleGradientColorStops(
      { alphaStart: 1, alphaEnd: 1 },
      gradient,
      chartIdx
    );
  }

  return gradient;
}

export const volumeComparisonOptions: ChartOptions<"bar"> = {
  plugins: {
    legend: {
      position: "top",
      align: "end",
    },
    tooltip: {
      backgroundColor: "rgba(12, 12, 12, 1)",
      borderColor: "#D4D4D8",
      borderWidth: 1,
      caretPadding: 6,
      yAlign: "bottom",
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        callback: function (val, idx) {
          const label = this.getLabelForValue(val as number);
          return handleTicksXAxis(label, idx);
        },
      },
      stacked: true,
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        drawOnChartArea: true,
        color: "#27272a",
      },
      ticks: {
        callback: function (val, idx) {
          return handleTicksYAxis(val as number, idx);
        },
      },
      stacked: true,
    },
  },
};
