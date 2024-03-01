import type { ChartOptions, ScriptableContext } from "chart.js";

import {
  handleGradientColorStops,
  handleTicksXAxis,
  handleTicksYAxis,
} from "./compareGeneralHelpers";

// https://www.chartjs.org/docs/latest/samples/advanced/linear-gradient.html
export function priceComparisonGradient(
  context: ScriptableContext<"line">,
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
      { alphaStart: 0.8, alphaEnd: 0.0 },
      gradient,
      chartIdx
    );
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
  plugins: {
    legend: {
      position: "top",
      align: "end",
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(12, 12, 12, 1)",
      borderColor: "#D4D4D8",
      borderWidth: 1,
      caretPadding: 14,
      yAlign: "top",
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
};
