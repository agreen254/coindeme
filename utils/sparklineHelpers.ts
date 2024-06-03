import type { ChartOptions } from "chart.js";

export function sparklineColor(isGaining: boolean) {
  return isGaining ? "#43FFDD" : "#F23F8A";
}

export function sparklineGradient(
  isGaining: boolean,
  gradient: CanvasGradient,
  theme: string | undefined
) {
  if (isGaining) {
    if (theme === "dark") {
      gradient.addColorStop(0, "rgba(20, 155, 20, 0.4)");
      gradient.addColorStop(0.6, "rgba(38, 38, 38, 0.0)");
    } else {
      gradient.addColorStop(0, "rgba(163, 245, 165, 0.4)");
      gradient.addColorStop(0.6, "rgba(255, 255, 255, 0)");
    }
  } else {
    if (theme === "dark") {
      gradient.addColorStop(0, "rgba(255, 99, 132, 0.4");
      gradient.addColorStop(0.6, "rgba(38, 38, 38, 0.0)");
    } else {
      gradient.addColorStop(0, "rgba(255, 99, 132, 0.3");
      gradient.addColorStop(0.6, "rgba(255, 255, 255, 0)");
    }
  }
  return gradient;
}

export const sparklineOptions: ChartOptions<"line"> = {
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hoverRadius: 0,
    },
  },
  events: [],
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};
