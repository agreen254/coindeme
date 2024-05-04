import type { ChartOptions, ScriptableContext } from "chart.js";
import type { Currency } from "../types";

import { defaultTooltip } from "./compareGeneralHelpers";
import { getCurrencySymbol } from "../getCurrencySymbol";
import { getMinTimeUnit } from "../getMinTimeUnit";
import {
  gridColor,
  handleGradientColorStops,
  handleTicksYAxis,
} from "./compareGeneralHelpers";

import "chartjs-adapter-date-fns";

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
      { alphaTop: 0.8, alphaBottom: 0.0 },
      gradient,
      chartIdx
    );
  }

  return gradient;
}

export function getOptions(
  currency: Currency,
  days: number,
  names: string[]
): ChartOptions<"line"> {
  const currencySymbol = getCurrencySymbol(currency);

  return {
    elements: {
      point: {
        radius: 0,
        hoverRadius: 10,
        hoverBorderWidth: 2,
      },
      line: {
        fill: true,
        tension: 0.1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: defaultTooltip(currency, currencySymbol, names),
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
        type: "time",
        time: {
          minUnit: getMinTimeUnit(days),
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: gridColor,
        },
        ticks: {
          callback: function (val) {
            return handleTicksYAxis(val as number, currencySymbol);
          },
        },
      },
    },
  };
}
