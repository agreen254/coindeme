import { ChartOptions } from "chart.js";
import {
  AnalysisDataMode,
  AnalysisSeries,
  AnalysisView,
  Currency,
  ThemeType,
} from "../types";
import {
  defaultTooltip,
  gridColor,
  gridNegativeColor,
  handleTicksYAxis,
  handleLabelText,
} from "./compareGeneralHelpers";
import { getMinTimeUnit } from "../getMinTimeUnit";
import { getCurrencySymbol } from "../getCurrencySymbol";

export function getOptions(
  currency: Currency,
  days: number,
  names: string[],
  theme: ThemeType,
  series: AnalysisSeries[],
  mode: AnalysisDataMode,
  view: AnalysisView
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
        text: (() => {
          if (mode === "Rate of Return") return "Rate of Return (%)";
          else
            return `${
              view === "Logarithmic" ? "log[" + mode + "]" : mode
            } (${currency.toUpperCase()})`;
        })(),
      },
      tooltip: defaultTooltip(currency, currencySymbol, names, theme, {
        callbacks: {
          label: function (item) {
            const newItem = {
              ...item,
              raw:
                // show the actual value instead of the log value
                view === "Logarithmic"
                  ? Math.pow(10, item.raw as number)
                  : (item.raw as number),
            };
            return handleLabelText(newItem, currency, currencySymbol, names);
          },
        },
      }),
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
        border: {
          display: hasLeftAxis,
          color: gridColor[theme],
        },
        grid: {
          color: (c) =>
            c["tick"]["value"] < 0
              ? gridNegativeColor[theme]
              : gridColor[theme],
        },
        ticks: {
          color: (c) => (c["tick"]["value"] < 0 ? "Red" : "Gray"),
          callback: function (val) {
            const tick = handleTicksYAxis(val as number, currencySymbol);
            return mode === "Rate of Return"
              ? String(tick).replace(currencySymbol, "") + "%"
              : tick;
          },
        },
      },
      y1: {
        type: "linear",
        display: hasRightAxis,
        position: "right",
        border: {
          display: hasRightAxis,
          color: gridColor[theme],
        },
        grid: {
          color: (c) =>
            c["tick"]["value"] < 0
              ? gridNegativeColor[theme]
              : gridColor[theme],
        },
        ticks: {
          color: (c) => (c["tick"]["value"] < 0 ? "Red" : "Gray"),
          callback: function (val) {
            const tick = handleTicksYAxis(val as number, currencySymbol);
            return mode === "Rate of Return"
              ? String(tick).replace(currencySymbol, "") + "%"
              : tick;
          },
        },
        // https://www.chartjs.org/docs/latest/api/classes/Scale.html#beforebuildticks
        // small description contained in the `CoreScaleOptions` interface in index.d.ts
        beforeBuildTicks: function (scale) {
          const leftTickCount = scale.chart.scales["y"].ticks.length;
          if (leftTickCount === 0) return;

          let scales = scale.chart.options.scales;
          if (scales && scales["y1"]?.ticks) {
            // the `count` property on this object exists only on the `linear` axis type,
            // but the typing in the library fails to recognize this.
            // @ts-ignore
            scales["y1"].ticks.count = leftTickCount;
          }

          return;
        },
      },
    },
  };
}
