import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";
import {
  getOptionsOverlapped,
  getOverlapBackgroundColor,
  getOverlapHoverColor,
  overlapData,
} from "@/utils/comparisonChartHelpers/compareVolumeHelpers";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";

import { Bar } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse[];
};

const VolumeOverlapComparisonChart = ({ chartData }: Props) => {
  const coinLabels = useCarouselSelectedElements();
  const { label: x, values } = prepareComparisonData(chartData, "total_volumes");
  const overlapValues = overlapData(values, coinLabels);

  const volumeChartData: ChartData<"bar"> = {
    labels: x,

    /**
     * The compiler will throw an error here even though the charts work without any issues.
     * The backgroundColor prop accepts an array; but if that array is generated through the callback it's not considered valid for some reason.
     *
     * I have raised a github issue about this:
     * https://github.com/chartjs/Chart.js/issues/11711
     *
     * ts-ignore for now
     */
    // @ts-ignore
    datasets: chartData.map((_, idx) => {
      return {
        backgroundColor: function (context) {
          return getOverlapBackgroundColor(
            idx,
            context,
            overlapValues,
            coinLabels
          );
        },
        hoverBackgroundColor: getOverlapHoverColor(
          idx,
          overlapValues,
          coinLabels
        ),

        data: overlapValues.map((value) => value[idx].volume),
        label: idx.toString(),
      };
    }),
  };

  return (
    <Bar
      data={volumeChartData}
      options={getOptionsOverlapped(overlapValues, x, coinLabels)}
    />
  );
};

export default VolumeOverlapComparisonChart;
