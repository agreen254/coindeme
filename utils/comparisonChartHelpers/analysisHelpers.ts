import { ChartOptions } from "chart.js";
import type {
  AnalysisScale,
  AnalysisSeries,
  Currency,
  ThemeType,
} from "../types";
import {
  defaultTooltip,
  handleTicksYAxis,
} from "./compareGeneralHelpers";
import { getMinTimeUnit } from "../getMinTimeUnit";
import { getCurrencySymbol } from "../getCurrencySymbol";

export function getOptions(
  currency: Currency,
  days: number,
  names: string[],
  theme: ThemeType,
  scale: AnalysisScale,
  series: AnalysisSeries[]
): ChartOptions<"line"> {
  const currencySymbol = getCurrencySymbol(currency);

  const hasLeftAxis = series.some((s) => s.axis === "left");
  const hasRightAxis = series.some((s) => s.axis === "right");

  const axisGridColors = {
    left: {
      dark: "#52525B",
      light: "#71717A",
    },
    right: {
      dark: "#27272A",
      light: "#D4D4D8",
    },
  };

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
        align: "center",
        font: {
          size: 22,
        },
        padding: {
          bottom: 24,
        },
        text: `Price (${currency.toUpperCase()})`,
      },
      tooltip: defaultTooltip(currency, currencySymbol, names, theme),
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
      y1: {
        type: scale,
        display: hasRightAxis,
        position: "right",
        title: {
          text: series
            .filter((s) => s.axis === "right")
            .map((s) => s.name)
            .join(" "),
          display: hasLeftAxis,
          font: {
            size: 18,
          },
        },
        border: {
          display: hasLeftAxis,
          color: axisGridColors.right[theme],
        },
        grid: {
          color: axisGridColors.right[theme],
          drawOnChartArea: true,
        },
        ticks: {
          callback: function (val) {
            return handleTicksYAxis(val as number, currencySymbol);
          },
        //   color: axisColors.right[theme],
        },
      },
      y: {
        type: scale,
        display: hasLeftAxis,
        position: "left",
        title: {
          text: series
            .filter((s) => s.axis === "left")
            .map((s) => s.name)
            .join(" "),
          display: hasRightAxis,
          font: {
            size: 18,
          },
        },
        border: {
          display: hasRightAxis,
          color: axisGridColors.left[theme],
        },
        grid: {
          color: axisGridColors.left[theme],
        },
        ticks: {
          callback: function (val) {
            return handleTicksYAxis(val as number, currencySymbol);
          },
        //   color: axisColors.left[theme],
        },
      },
    },
  };
}
