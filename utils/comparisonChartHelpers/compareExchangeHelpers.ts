import type { ChartOptions } from "chart.js";

import {
  gridColor,
  handleTicksYAxis,
  tooltipBackgroundColor,
} from "./compareGeneralHelpers";
import { roundDigits } from "../formatHelpers";
import { getMinTimeUnit } from "../getMinTimeUnit";

import "chartjs-adapter-date-fns";

interface ExchangeOptionConfig {
  coinOneName: string;
  coinOneSymbol: string;
  coinTwoName: string;
  coinTwoSymbol: string;
  len: number;
  days: number;
}

export const getOptions = ({
  coinOneName,
  coinOneSymbol,
  coinTwoName,
  coinTwoSymbol,
  days,
}: ExchangeOptionConfig): ChartOptions<"line"> => ({
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
      position: "top",
      display: true,
      font: {
        size: 22,
      },
      text:
        coinOneName +
        ` (${coinOneSymbol.toUpperCase()})` +
        " to " +
        coinTwoName +
        ` (${coinTwoSymbol.toUpperCase()})`,
    },
    tooltip: {
      backgroundColor: tooltipBackgroundColor,
      borderColor: "#FFF",
      borderWidth: 1.25,
      caretPadding: 14,
      position: "nearest",
      displayColors: false,
      padding: 12,
      bodyColor: "#D1D5DB",
      bodyFont: {
        size: 16,
      },
      titleFont: {
        size: 20,
      },
      yAlign: "top",

      callbacks: {
        title: function (items) {
          const convVal = items[0].raw as number;

          return `1 ${coinOneSymbol.toUpperCase()} = ${
            convVal < 0.01 ? convVal.toExponential(3) : roundDigits(convVal, 3)
          } ${coinTwoSymbol.toUpperCase()}`;
        },
        label: function (item) {
          return item.label;
        },
      },
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
        color: gridColor,
      },
      ticks: {
        font: { size: 15 },
      },
      type: "time",
      time: {
        minUnit: getMinTimeUnit(days),
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
        callback: function (val, idx) {
          return handleTicksYAxis(val as number, idx);
        },
      },
    },
  },
});
