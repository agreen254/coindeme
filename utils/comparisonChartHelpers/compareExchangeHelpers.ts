import type { ChartOptions } from "chart.js";

import {
  gridColor,
  handleTicksXAxis,
  handleTicksYAxis,
  tooltipBackgroundColor,
  tooltipBorderColor,
} from "./compareGeneralHelpers";

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
  len,
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
    tooltip: {
      backgroundColor: tooltipBackgroundColor,
      borderColor: tooltipBorderColor,
      borderWidth: 1,
      caretPadding: 14,
      position: "nearest",
      displayColors: false,
      yAlign: "top",

      callbacks: {
        title: function (items) {
          return `1 ${coinOneSymbol.toUpperCase()} = ${
            items[0].raw
          } ${coinTwoSymbol.toUpperCase()}`;
        },
        label: function (item) {
          const unixTime = parseInt(item.label);
          return new Date(unixTime).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
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
        drawOnChartArea: false,
        tickColor: gridColor,
      },
      ticks: {
        callback: function (val, idx) {
          const mod1 = Math.round(len / (days > 1 ? days : 24));
          if (idx % mod1 !== 0) return "";
          const label = this.getLabelForValue(val as number);
          return handleTicksXAxis(label, idx);
        },
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
