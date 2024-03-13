import type { ChartOptions, LegendItem, ScriptableContext } from "chart.js";
import type { OverlappedVolumeData } from "../types";

import { arrayOfNs } from "../arrayHelpers";
import {
  chartColorSets,
  gridColor,
  handleGradientColorStops,
  handleTicksXAxis,
  handleTicksYAxis,
  legendFontColor,
  tooltipBackgroundColor,
  tooltipBorderColor,
} from "./compareGeneralHelpers";
import { sort } from "fast-sort";
import { formatPriceChangeValue } from "../formatHelpers";

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

/**
 * The options object needs to be generated dynamically because of the callbacks depending on the chart data.
 */
export function getOptionsOverlapped(
  overlapValues: OverlappedVolumeData[][],
  xValues: number[],
  carouselSelected: string[]
): ChartOptions<"bar"> {
  return {
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          // need to customize legend labels because same datasets will have different colors
          // https://www.chartjs.org/docs/latest/configuration/legend.html#legend-item-interface
          generateLabels: () =>
            carouselSelected.map((ele, idx) => {
              return {
                text: ele,
                fontColor: legendFontColor,
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
        caretPadding: 10,
        position: "nearest",
        yAlign: "bottom",

        // sort tooltip order so that highest values will show first
        itemSort: function (first, second) {
          return second.datasetIndex - first.datasetIndex;
        },

        callbacks: {
          // make sure the overlapped volume data still shows the correct absolute values
          // https://www.chartjs.org/docs/latest/configuration/tooltip.html#label-callback
          label: function (item) {
            let label = item.dataset.label || "";

            const dataIdx = item.dataIndex;
            const datasetIdx = item.datasetIndex;

            let sumVolume = overlapValues[dataIdx][0].volume;
            if (datasetIdx !== 0) {
              // add up all the previous values
              sumVolume = overlapValues[dataIdx].reduce((acc, current, idx) => {
                return idx <= datasetIdx ? acc + current.volume : acc;
              }, 0);
            }

            if (label) {
              label = `${
                overlapValues[dataIdx][datasetIdx].name
              }: ${formatPriceChangeValue(sumVolume)}`;
            }

            return label;
          },

          // customize title of tooltip so it doesn't just display the unix time returned from the API call
          title: function (items) {
            return items.map((item) => {
              const unixTime = xValues[item.dataIndex];
              const date = new Date(unixTime).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              });
              return date;
            })[0]; // will repeatedly display the title equal to the number of datasets if not specified
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

/**
 * This function will __overlap__ the datasets as opposed to __stacking__ them.
 *
 * The difference is as follows:
 *
 * Stacked datasets will show the entire value of each set on top of each other.
 * Overlapped datasets will preserve the overall scale, meaning that if a different colored bar
 * is only 10% higher than the one below it, the total value of the higher bar is 10% __higher__ than the lower bar.
 * In a stacked configuration, the value of the higher bar would be only 10% __total__ of the lower bar.
 *
 *              B                   B
 *              B                   B
 *              B                   B
 *              A                   A
 *              A                   A
 *              A                   A
 *              A                   A
 *              A                   A
 *
 *      Stacked: A=5, B=3     Overlapped: A=5, B=5+3=8
 *
 * The idea here is that users can very clearly see when values have overtaken one another; these details are ambiguous
 * on a traditionally stacked bar chart because they would both appear to be roughly the same size.
 */
export function overlapData(datasets: number[][], labels: string[]) {
  // need arrays of correct length to map over: values inside are inconsequential
  const nDatapointsArray = arrayOfNs(datasets[0].length);
  const nDatasetsArray = arrayOfNs(datasets.length);

  return nDatapointsArray.map((_, mapIdx) => {
    // take the original values and transform them into the OverlappedVolumeData structure
    const dataPoints = nDatasetsArray.reduce(
      (points: OverlappedVolumeData[], _, reduceIdx) => {
        return [
          ...points,
          {
            name: labels[reduceIdx],
            volume: datasets[reduceIdx][mapIdx],
          },
        ];
      },
      [] as OverlappedVolumeData[]
    );

    // sort the values to ensure we are going from smallest to largest when we render them in the chart
    const sortedPoints = sort(dataPoints).by([
      { asc: (label) => label.volume },
    ]);

    // account for the error caused by stacking whole values by shaving off the value of the prior point as we go forward
    const correctedPoints: OverlappedVolumeData[] = sortedPoints.reduce(
      (points: OverlappedVolumeData[], _, reduceIdx) => {
        return [
          ...points,
          {
            name: sortedPoints[reduceIdx].name,
            volume:
              reduceIdx === 0
                ? sortedPoints[0].volume
                : sortedPoints[reduceIdx].volume -
                  sortedPoints[reduceIdx - 1].volume,
          },
        ];
      },
      []
    );

    return correctedPoints;
  });
}

/**
 * Returns the index that the name of the point corresponds to in the
 * selected carousel elements. This determines what color the point should use.
 */
function getPointNameIdx(
  points: OverlappedVolumeData[],
  idx: number,
  labels: string[]
) {
  return labels.findIndex((label) => label === points[idx].name);
}

/**
 * Generates an array of backgroundColor values each dataset should use.
 *
 * Because the data is being overlapped, the same dataset needs to have different
 * background colors depending on what the smallest value is for all the datasets.
 *
 * If a larger value is drawn over it; it will be overridden and unable to be seen.
 */
export function getOverlapBackgroundColor(
  idx: number,
  context: ScriptableContext<"bar">,
  overlapValues: OverlappedVolumeData[][],
  labels: string[]
) {
  return overlapValues.map((points) => {
    const nameIdx = getPointNameIdx(points, idx, labels);
    return volumeComparisonGradient(context, nameIdx);
  });
}

/**
 * Generates the array of hover colors each dataset should use.
 */
export function getOverlapHoverColor(
  idx: number,
  overlapValues: OverlappedVolumeData[][],
  labels: string[]
) {
  return overlapValues.map((points) => {
    const nameIdx = getPointNameIdx(points, idx, labels);
    return chartColorSets[nameIdx].highlightColor.hex;
  });
}
