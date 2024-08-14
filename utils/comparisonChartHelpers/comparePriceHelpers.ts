import type { ChartOptions, ScriptableContext } from "chart.js";
import type { ChartResponsiveValues, Currency, ThemeType } from "../types";

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
  chartIdx: number = 0,
  theme: ThemeType
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
      theme === "dark"
        ? { alphaTop: 0.8, alphaBottom: 0.0 }
        : { alphaBottom: 0, alphaTop: 0.3 },
      gradient,
      chartIdx
    );
  }

  return gradient;
}

export function getOptions(
  currency: Currency,
  days: number,
  names: string[],
  theme: ThemeType,
  responsiveValues: ChartResponsiveValues
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
        borderWidth: responsiveValues.lineThickness,
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
          size: responsiveValues.titleFontSize,
        },
        padding: {
          bottom: 18,
        },
        text: `Price (${currency.toUpperCase()})`,
      },
      tooltip: defaultTooltip(
        currency,
        currencySymbol,
        names,
        theme,
        responsiveValues
      ),
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
          font: {
            size: responsiveValues.tickFontSize,
          },
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
            return handleTicksYAxis(val as number, currencySymbol);
          },
          font: {
            size: responsiveValues.tickFontSize,
          },
        },
      },
    },
  };
}
