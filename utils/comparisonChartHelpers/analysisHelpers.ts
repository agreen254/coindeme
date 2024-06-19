import { ChartOptions } from "chart.js";
import type { AnalysisSeries, Currency, ThemeType } from "../types";
import {
  defaultTooltip,
  gridColor,
  handleTicksYAxis,
} from "./compareGeneralHelpers";
import { getMinTimeUnit } from "../getMinTimeUnit";
import { getCurrencySymbol } from "../getCurrencySymbol";

export function getOptions(
  currency: Currency,
  days: number,
  names: string[],
  theme: ThemeType,
  series: AnalysisSeries[]
): ChartOptions<"line"> {
  const currencySymbol = getCurrencySymbol(currency);

  const hasLeftAxis = series.some((s) => s.axis === "left");
  const hasRightAxis = series.some((s) => s.axis === "right");

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
          drawOnChartArea: true,
          color: gridColor[theme],
        },
        type: "time",
        time: {
          minUnit: getMinTimeUnit(days),
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        type: "linear",
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
          color: gridColor[theme],
        },
        grid: {
          color: gridColor[theme],
        },
        ticks: {
          callback: function (val) {
            return handleTicksYAxis(val as number, currencySymbol);
          },
        },
      },
      y1: {
        type: "linear",
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
          color: gridColor[theme],
        },
        grid: {
          color: gridColor[theme],
          drawOnChartArea: true,
        },
        ticks: {
          callback: function (val) {
            return handleTicksYAxis(val as number, currencySymbol);
          },
        },
        beforeBuildTicks: function (scale) {
          const leftTickCount = scale.chart.scales["y"].ticks.length;
          if (leftTickCount === 0) return;

          const scales = scale.chart.options.scales;

          if (scales && scales["y1"]?.ticks) {
            // the `count` property on this object exists only on the `linear` axis type,
            // but the corresponding type does not recognize it.
            // @ts-ignore
            scales["y1"].ticks.count = leftTickCount;
          }

          return;
        },
      },
    },
  };
}
