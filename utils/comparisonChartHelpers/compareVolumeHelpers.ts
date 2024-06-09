import type { ChartOptions, ScriptableContext } from "chart.js";
import { sort } from "fast-sort";
import "chartjs-adapter-date-fns";

import type { Currency, OverlappedVolumeData, ThemeType } from "../types";
import { arrayOfNs } from "../arrayHelpers";
import {
  chartColorSets,
  gridColor,
  handleGradientColorStops,
  handleTicksYAxis,
} from "./compareGeneralHelpers";
import { defaultTooltip } from "./compareGeneralHelpers";
import { formatSmallNum } from "../formatHelpers";
import { getCurrencySymbol } from "../getCurrencySymbol";
import { getMinTimeUnit } from "../getMinTimeUnit";

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
      { alphaTop: 1, alphaBottom: 1 },
      gradient,
      chartIdx
    );
  }

  return gradient;
}

export function getOptionsStacked(
  currency: Currency,
  days: number,
  names: string[],
  theme: ThemeType
): ChartOptions<"bar"> {
  const currencySymbol = getCurrencySymbol(currency);

  return {
    plugins: {
      title: {
        display: true,
        align: "start",
        font: {
          size: 22,
        },
        padding: {
          bottom: 18,
        },
        text: `Volume (${currency.toUpperCase()})`,
      },
      legend: {
        display: false,
      },
      tooltip: defaultTooltip(currency, currencySymbol, names),
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
        // this MUST be a `timeseries` scale and NOT a `time` scale because the regular
        // time scale will render any gaps between times as blank
        // unfortunately, using this format will also cause the adapter to display multiple tickmarks of the same value.
        // set the maxTicksLimit to help circumvent this behavior. There is still a possibility identical ticks will be displayed, though
        // (e.g.)  /      /       /
        //      May 1   May 1   May 1
        type: "timeseries",
        time: {
          minUnit: getMinTimeUnit(days),
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
        },
        stacked: true,
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          drawOnChartArea: true,
          color: gridColor[theme],
        },
        ticks: {
          callback: function (val) {
            return handleTicksYAxis(val as number, currencySymbol);
          },
        },
        stacked: true,
      },
    },
  };
}

export function getOptionsOverlapped(
  currency: Currency,
  overlapValues: OverlappedVolumeData[][],
  days: number,
  names: string[],
  ids: string[],
  theme: ThemeType
): ChartOptions<"bar"> {
  const currencySymbol = getCurrencySymbol(currency);

  // overlapping the values means we can no longer map the datasetIndex property to the index of the name array;
  // create this map instead to access the corresponding name
  const idsToNamesMap = new Map<string, string>(
    ids.map((id, idx) => [id, names[idx]])
  );
  const idsToNamesArr = Array.from(idsToNamesMap);

  return {
    plugins: {
      title: {
        display: true,
        align: "start",
        font: {
          size: 22,
        },
        padding: {
          bottom: 18,
        },
        text: `Volume (${currency.toUpperCase()})`,
      },
      legend: {
        display: false,
      },
      tooltip: defaultTooltip(currency, currencySymbol, names, {
        itemSort(a, b) {
          return b.datasetIndex - a.datasetIndex;
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

            const id = overlapValues[dataIdx][datasetIdx].name;
            const name = idsToNamesMap.get(id)!;
            if (label) {
              const formattedValue =
                sumVolume > 0.01
                  ? Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: currency,
                    }).format(sumVolume)
                  : currencySymbol + formatSmallNum(sumVolume);
              label = " " + name + ": " + formattedValue;
            }

            return label;
          },
          labelColor(item) {
            const id = overlapValues[item.dataIndex][item.datasetIndex].name;
            const idx = idsToNamesArr.findIndex((kv) => kv[0] === id);
            return {
              borderColor: chartColorSets[idx].highlightColor.hex,
              backgroundColor: chartColorSets[idx].highlightColor.hex,
              borderWidth: 0,
              borderRadius: 2,
            };
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
          drawOnChartArea: false,
        },
        type: "timeseries",
        time: {
          minUnit: getMinTimeUnit(days),
        },
        stacked: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          drawOnChartArea: true,
          color: gridColor[theme],
        },
        ticks: {
          callback: function (val) {
            return handleTicksYAxis(val as number, currencySymbol);
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
 * Generates an array of backgroundColor values each dataset should use.
 *
 * Because the data is being overlapped, the same dataset needs to have different
 * background colors depending on what the smallest value is for all the datasets.
 */
export function getOverlapBackgroundColor(
  idx: number,
  context: ScriptableContext<"bar">,
  overlapValues: OverlappedVolumeData[][],
  labels: string[]
) {
  const coinName = overlapValues[context.dataIndex][idx].name;
  const nameIdx = labels.findIndex((label) => label === coinName);
  return volumeComparisonGradient(context, nameIdx);
}

/**
 * Generates the array of hover colors each dataset should use.
 */
export function getOverlapHoverColor(
  idx: number,
  context: ScriptableContext<"bar">,
  overlapValues: OverlappedVolumeData[][],
  labels: string[]
) {
  const coinName = overlapValues[context.dataIndex][idx].name;
  const nameIdx = labels.findIndex((label) => label === coinName);
  return chartColorSets[nameIdx].highlightColor.hex;
}
