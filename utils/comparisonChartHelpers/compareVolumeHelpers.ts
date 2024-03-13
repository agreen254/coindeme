import type { ChartOptions, LegendItem, ScriptableContext } from "chart.js";

import { arrayOfNs } from "../arrayHelpers";
import {
  chartColorSets,
  gridColor,
  handleGradientColorStops,
  handleTicksXAxis,
  handleTicksYAxis,
  tooltipBackgroundColor,
  tooltipBorderColor,
} from "./compareGeneralHelpers";
import { sort } from "fast-sort";

// https://www.chartjs.org/docs/latest/samples/advanced/linear-gradient.html
export function volumeComparisonGradient(
  context: ScriptableContext<"bar">,
  chartIdx: number = 0
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
      { alphaStart: 1, alphaEnd: 1 },
      gradient,
      chartIdx
    );
  }

  return gradient;
}

export const volumeComparisonOptions: ChartOptions<"bar"> = {
  plugins: {
    legend: {
      position: "top",
      align: "end",
    },
    tooltip: {
      backgroundColor: tooltipBackgroundColor,
      borderColor: tooltipBorderColor,
      borderWidth: 1,
      caretPadding: 6,
      yAlign: "bottom",
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
      },
      ticks: {
        callback: function (val, idx) {
          const label = this.getLabelForValue(val as number);
          return handleTicksXAxis(label, idx);
        },
      },
      stacked: true,
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        drawOnChartArea: true,
        color: gridColor,
      },
      ticks: {
        callback: function (val, idx) {
          return handleTicksYAxis(val as number, idx);
        },
      },
      stacked: true,
    },
  },
};

export function getVolumeChartOptions(
  carouselSelected: string[]
): ChartOptions<"bar"> {
  return {
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          // https://www.chartjs.org/docs/latest/configuration/legend.html#legend-item-interface
          generateLabels: (): LegendItem[] =>
            carouselSelected.map((ele, idx) => {
              return {
                text: ele,
                fontColor: "#A1A1AA",
                fillStyle: chartColorSets[idx].startColor.hex,
                hidden: false,
                lineCap: "round",
                lineWidth: 2,
                strokeStyle: chartColorSets[idx].startColor.hex,
              };
            }),
        },
      },
      tooltip: {
        backgroundColor: tooltipBackgroundColor,
        borderColor: tooltipBorderColor,
        borderWidth: 1,
        caretPadding: 6,
        yAlign: "bottom",
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
        },
        ticks: {
          callback: function (val, idx) {
            const label = this.getLabelForValue(val as number);
            return handleTicksXAxis(label, idx);
          },
        },
        stacked: true,
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          drawOnChartArea: true,
          color: gridColor,
        },
        ticks: {
          callback: function (val, idx) {
            return handleTicksYAxis(val as number, idx);
          },
        },
        stacked: true,
      },
    },
  };
}

type StackedData = { name: string; volume: number };

export function stackOne(datasets: number[][], labels: string[]) {
  let result: StackedData[][] = [];
  for (let i = 0; i < datasets[0].length; i++) {
    result.push([{ name: labels[0], volume: datasets[0][i] }]);
  }

  return result;
}

export function stackTwo(datasets: number[][], labels: string[]) {
  let result: StackedData[][] = [];
  for (let i = 0; i < datasets[0].length; i++) {
    const dataPoint = [
      {
        name: labels[0],
        volume: datasets[0][i],
      },
      {
        name: labels[1],
        volume: datasets[1][i],
      },
    ];
    const sortedPoint = sort(dataPoint).by([{ asc: (label) => label.volume }]);

    const correctedPoint: StackedData[] = [
      {
        name: sortedPoint[0].name,
        volume: sortedPoint[0].volume,
      },
      {
        name: sortedPoint[1].name,
        volume: sortedPoint[1].volume - sortedPoint[0].volume,
      },
    ];

    result.push(correctedPoint);
  }

  return result;
}

export function stackThree(datasets: number[][], labels: string[]) {
  let result: StackedData[][] = [];
  for (let i = 0; i < datasets[0].length; i++) {
    const dataPoint = [
      {
        name: labels[0],
        volume: datasets[0][i],
      },
      {
        name: labels[1],
        volume: datasets[1][i],
      },
      {
        name: labels[2],
        volume: datasets[2][i],
      },
    ];
    const sortedPoint = sort(dataPoint).by([{ asc: (label) => label.volume }]);

    const correctedPoint: StackedData[] = [
      {
        name: sortedPoint[0].name,
        volume: sortedPoint[0].volume,
      },
      {
        name: sortedPoint[1].name,
        volume: sortedPoint[1].volume - sortedPoint[0].volume,
      },
      {
        name: sortedPoint[2].name,
        volume: sortedPoint[2].volume - sortedPoint[1].volume,
      },
    ];

    result.push(correctedPoint);
  }

  return result;
}

export function stackDataRelative(datasets: number[][], labels: string[]) {
  let result: StackedData[][] = [];

  // this will only work if all datasets are the same length
  const nPoints = datasets[0].length;
  const nDatasets = datasets.length;
  const dummy = arrayOfNs(nDatasets);

  for (let i = 0; i < nPoints; i++) {
    const dataPoints = dummy.reduce((points: StackedData[], _, idx) => {
      return [
        ...points,
        {
          name: labels[idx],
          volume: datasets[idx][i],
        },
      ];
    }, [] as StackedData[]);

    const sortedPoints = sort(dataPoints).by([
      { asc: (label) => label.volume },
    ]);

    const correctedPoints: StackedData[] = sortedPoints.reduce(
      (points: StackedData[], _, idx) => {
        return [
          ...points,
          {
            name: sortedPoints[idx].name,
            volume:
              idx === 0
                ? sortedPoints[0].volume
                : sortedPoints[idx].volume - sortedPoints[idx - 1].volume,
          },
        ];
      },
      []
    );

    result.push(correctedPoints);
  }

  return result;
}

export function getStackedBackgroundColor(
  idx: number,
  context: ScriptableContext<"bar">,
  stackedValues: StackedData[][],
  labels: string[],
) {
  return stackedValues.map((value) => {
    const name = value[idx].name;
    const nameIdx = labels.findIndex((label) => label === name);
    return volumeComparisonGradient(context, nameIdx);
  });
}

export function getStackedHoverColor(
  idx: number,
  stackedValues: StackedData[][],
  labels: string[]
) {
  return stackedValues.map((value) => {
    const name = value[idx].name;
    const nameIdx = labels.findIndex((label) => label === name);
    return chartColorSets[nameIdx].highlightColor.hex;
  });
}
