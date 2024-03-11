import type { ChartColorSet } from "../types";

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
  Tooltip
);

import { formatPriceChangeValue } from "../formatHelpers";

/**
 * Comparison charts will have a maximum number of points per dataset equivalent to this value.
 *
 * If the raw dataset has more points, data will be decimated (compressed) to meet the threshold
 * before being drawn.
 */
export const decimationThreshold = 150;

export const gridColor = "#27272A";
export const tooltipBackgroundColor = "#121212";
export const tooltipBorderColor = "#D4D4D8";

export function handleGradientColorStops(
  alphaValues: { alphaStart: number; alphaEnd: number },
  gradient: CanvasGradient | undefined,
  chartIdx: number
) {
  const {
    r: rStart,
    g: gStart,
    b: bStart,
  } = chartColorSets[chartIdx].startColor.rgb;
  const { r: rEnd, g: gEnd, b: bEnd } = chartColorSets[chartIdx].endColor.rgb;

  gradient?.addColorStop(
    1,
    `rgba(${rStart}, ${gStart}, ${bStart}, ${alphaValues.alphaStart})`
  );
  gradient?.addColorStop(
    0,
    `rgba(${rEnd}, ${gEnd}, ${bEnd}, ${alphaValues.alphaEnd})`
  );
}

export function handleTicksXAxis(label: string, index: number) {
  if (index % 3 !== 0) return "";

  const date = new Date(label);
  const formattedDate = date.toLocaleString("en-US", { dateStyle: "short" });
  return formattedDate;
}

export function handleTicksYAxis(value: number, index: number) {
  if (value === 0) return 0; // don't want '0.00e0'
  return formatPriceChangeValue(value);
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
      hex: "#F5980A",
      rgb: {
        r: 245,
        g: 152,
        b: 10,
      },
    },
    startColor: {
      hex: "#D5CA54",
      rgb: {
        r: 213,
        g: 202,
        b: 84,
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
  // {
  //   start: "#D5CA54",
  //   end: "#D58A54",
  // },
];
