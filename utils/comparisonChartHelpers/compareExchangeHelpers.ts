import type { ChartOptions } from "chart.js";
import "chartjs-adapter-date-fns";

import {
  gridColor,
  handleTicksYAxis,
  tooltipBackgroundColor,
  tooltipBorderColor,
  legendBodyTextColor,
  legendTitleTextColor,
} from "./compareGeneralHelpers";
import { roundDigits } from "../formatHelpers";
import { getMinTimeUnit } from "../getMinTimeUnit";
import { ChartResponsiveValues, ThemeType } from "../types";

interface ExchangeOptionConfig {
  coinOneName: string;
  coinOneSymbol: string;
  coinTwoName: string;
  coinTwoSymbol: string;
  len: number;
  days: number;
  theme: ThemeType;
  responsiveValues: ChartResponsiveValues;
}

export const getOptions = ({
  coinOneName,
  coinOneSymbol,
  coinTwoName,
  coinTwoSymbol,
  days,
  theme,
  responsiveValues,
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
        size: responsiveValues.titleFontSize,
      },
      text:
        coinOneName +
        ` (${coinOneSymbol.toUpperCase()})` +
        " to " +
        coinTwoName +
        ` (${coinTwoSymbol.toUpperCase()})`,
    },
    tooltip: {
      backgroundColor: tooltipBackgroundColor[theme],
      borderColor: tooltipBorderColor[theme],
      bodyColor: legendBodyTextColor[theme],
      titleColor: legendTitleTextColor[theme],
      borderWidth: 1,
      caretPadding: 4,
      caretSize: 8,
      padding: responsiveValues.tooltipPaddingSize,
      position: "nearest",
      yAlign: "center",
      usePointStyle: true,
      displayColors: false,
      titleFont: {
        size: responsiveValues.tooltipFontSize,
      },
      bodyFont: {
        size: responsiveValues.tooltipFontSize,
      },

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
        color: gridColor[theme],
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
        color: gridColor[theme],
      },
      ticks: {
        callback: function (val) {
          return handleTicksYAxis(val as number);
        },
      },
    },
  },
});
