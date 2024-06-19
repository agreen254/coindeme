import { ChartOptions } from "chart.js";
import type { AnalysisSeries, Currency, ThemeType } from "../types";
import { isDefined } from "../isDefined";
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
        // Make sure ticks are the same count
        // https://stackoverflow.com/questions/56696642/how-to-match-left-and-right-tick-intervals-with-chartjs
        beforeUpdate: function (scale) {
          const max = Math.max.apply(
            this,
            (scale.chart.config.data.datasets[1].data.filter(
              isDefined
            ) as number[]) ?? [0]
          );
          let leftTickCount = scale.chart.scales["y"].ticks.length;
          leftTickCount = leftTickCount < 7 ? 7 : leftTickCount - 1;

          const leftAxisMin = Math.min.apply(
            Math,
            scale.chart.scales["y"].ticks.map((t) => t.value)
          );
          const stepSize = max / leftTickCount;

          // scale.chart.options?.scales["y1"].ticks.stepSize = stepSize;
          return;
        },
      },
    },
  };
}
