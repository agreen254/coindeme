import type { ChartOptions } from "chart.js";

import type { Currency } from "./types";
import {
  defaultTooltip,
  gridColor,
  handleTicksYAxis,
} from "./comparisonChartHelpers/compareGeneralHelpers";
import { getMinTimeUnit } from "./getMinTimeUnit";
import { getCurrencySymbol } from "./getCurrencySymbol";

import "chartjs-adapter-date-fns";

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
      title: {
        display: true,
        align: "start",
        font: {
          size: 22,
        },
        padding: {
          bottom: 18,
        },
        text: `Price (${currency.toUpperCase()})`,
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
