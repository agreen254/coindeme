import type { ChartColorSet, Currency, ThemeType } from "../types";

import { formatSmallNum } from "../formatHelpers";
import { formatPriceValue } from "../formatHelpers";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  TimeScale,
  TimeSeriesScale,
  TooltipItem,
  TooltipLabelStyle,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  TimeScale,
  TimeSeriesScale
);

/**
 * Comparison charts will have a maximum number of points per dataset equivalent to this value.
 *
 * If the raw dataset has more points, data will be decimated (compressed) to meet the threshold
 * before being drawn.
 */
export const decimationThreshold = 150;

export const gridColor = {
  light: "#D8D8D5",
  dark: "#27272A",
};
export const legendBodyTextColor = { dark: "#A1A1AA", light: "#52525B" };
export const legendTitleTextColor = { dark: "#FFF", light: "#09090B" };
export const tooltipBackgroundColor = { dark: "#121212", light: "#FFF" };
export const tooltipBorderColor = { dark: "#71717A", light: "#121212" };

export function handleGradientColorStops(
  alphaValues: { alphaTop: number; alphaBottom: number },
  gradient: CanvasGradient | undefined,
  chartIdx: number
) {
  const { r: rTop, g: gTop, b: bTop } = chartColorSets[chartIdx].startColor.rgb;
  const {
    r: rBottom,
    g: gBottom,
    b: bBottom,
  } = chartColorSets[chartIdx].endColor.rgb;

  gradient?.addColorStop(
    1,
    `rgba(${rTop}, ${gTop}, ${bTop}, ${alphaValues.alphaTop})`
  );
  gradient?.addColorStop(
    0,
    `rgba(${rBottom}, ${gBottom}, ${bBottom}, ${alphaValues.alphaBottom})`
  );
}

export function handleTicksXAxis(label: string, index: number) {
  if (index % 3 !== 0) return "";

  const date = new Date(label);
  const formattedDate = date.toLocaleString("en-US", { dateStyle: "short" });
  return formattedDate;
}

export function handleTicksYAxis(value: number, currencySymbol?: string) {
  return value === 0 ? 0 : (currencySymbol ?? "") + formatPriceValue(value);
}

export function handleLabelText(
  item: TooltipItem<"line" | "bar">,
  currency: Currency,
  currencySymbol: string,
  names: string[]
) {
  const value = parseFloat(item.raw as string);
  const formattedValue =
    value > 0.01
      ? Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
        }).format(value)
      : currencySymbol + formatSmallNum(value);
  return " " + names[item.datasetIndex] + ": " + formattedValue;
}

export function handleLabelColor(
  item: TooltipItem<"line" | "bar">
): TooltipLabelStyle {
  const idx = item.datasetIndex;
  return {
    borderColor: chartColorSets[idx].highlightColor.hex,
    backgroundColor: chartColorSets[idx].startColor.hex,
    borderWidth: 4,
    borderRadius: 2,
  };
}

type TooltipOptions = NonNullable<
  ChartOptions<"line" | "bar">["plugins"]
>["tooltip"];
export function defaultTooltip(
  currency: Currency,
  currencySymbol: string,
  names: string[],
  theme: ThemeType,
  overrides?: TooltipOptions
): TooltipOptions {
  return {
    backgroundColor: tooltipBackgroundColor[theme],
    borderColor: tooltipBorderColor[theme],
    bodyColor: legendBodyTextColor[theme],
    titleColor: legendTitleTextColor[theme],
    borderWidth: 1,
    caretPadding: 4,
    caretSize: 8,
    padding: 16,
    position: "nearest",
    yAlign: "center",
    usePointStyle: true,
    ...overrides,
    titleFont: {
      size: 16,
      ...overrides?.titleFont,
    },
    bodyFont: {
      size: 16,
      ...overrides?.bodyFont,
    },
    callbacks: {
      label: function (item) {
        return handleLabelText(item, currency, currencySymbol, names);
      },
      labelColor: function (item) {
        return handleLabelColor(item);
      },
      labelPointStyle: function (_) {
        return {
          pointStyle: "rectRounded",
          rotation: 0,
        };
      },
      ...overrides?.callbacks,
    },
  };
}

/**
 * Line and gradient colorsets for the comparison data.
 *
 * These will be mapped over when the comparison chart has multiple datasets
 * and colors will be automatically handled.
 */
export const chartColorSets: ChartColorSet[] = [
  {
    // teal
    highlightColor: {
      hex: "#34D3D5",
      rgb: {
        r: 52,
        g: 211,
        b: 213,
      },
    },
    startColor: {
      hex: "#14B8A6",
      rgb: {
        r: 52,
        g: 211,
        b: 153,
      },
    },
    endColor: {
      hex: "#134E4A",
      rgb: {
        r: 19,
        g: 78,
        b: 74,
      },
    },
  },
  {
    // purple
    highlightColor: {
      hex: "#F57ED5",
      rgb: {
        r: 245,
        g: 126,
        b: 213,
      },
    },
    startColor: {
      hex: "#CA54D5",
      rgb: {
        r: 202,
        g: 84,
        b: 213,
      },
    },
    endColor: {
      hex: "#692570",
      rgb: {
        r: 105,
        g: 37,
        b: 112,
      },
    },
  },
  {
    // yellow
    highlightColor: {
      hex: "#EAF47B",
      rgb: {
        r: 234,
        g: 244,
        b: 123,
      },
    },
    startColor: {
      hex: "#C37D1B",
      rgb: {
        r: 195,
        g: 125,
        b: 27,
      },
    },
    endColor: {
      hex: "#D58A54",
      rgb: {
        r: 213,
        g: 138,
        b: 84,
      },
    },
  },
];
