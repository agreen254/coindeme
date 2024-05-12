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

type AnalysisOptionsProps = {
  currency: Currency;
  days: number;
  names: string[];
  title: string;
  axes: string[];
  isLog: boolean;
};
export function getOptions(
  currency: Currency,
  days: number,
  names: string[],
  title: string,
  isLog: boolean
): ChartOptions<"line"> {
  const currencySymbol = getCurrencySymbol(currency);

  return {
    backgroundColor: "rgba(255,255,255,0)",
    elements: {
      point: {
        radius: 0,
        hoverRadius: 10,
        hoverBorderWidth: 2,
      },
      line: {
        fill: true,
        tension: 0.5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        align: "center",
        font: {
          size: 22,
        },
        padding: {
          bottom: 18,
        },
        text: title,
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
          color: gridColor,
        },
        type: "time",
        time: {
          minUnit: getMinTimeUnit(days),
        },
        ticks: {
          autoSkip: true,
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
        position: "left",
        type: "linear",
      },
      y1: {
        display: false,
        border: {
          display: false,
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (val) {
            return handleTicksYAxis(val as number, currencySymbol);
          },
        },
        type: isLog ? "logarithmic" : "linear",
        position: "right",
      },
    },
  };
}
