import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";
import {
  getStackedBackgroundColor,
  getStackedHoverColor,
  getVolumeChartOptions,
  stackDataRelative,
} from "@/utils/comparisonChartHelpers/compareVolumeHelpers";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";

import { Bar } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse[];
};

const VolumeComparisonChart = ({ chartData }: Props) => {
  const coinLabels = useCarouselSelectedElements();
  const { label, values } = prepareComparisonData(chartData, "total_volumes");
  const stackedValues = stackDataRelative(values, coinLabels);

  const volumeChartData: ChartData<"bar"> = {
    labels: label,

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
          return getStackedBackgroundColor(
            idx,
            context,
            stackedValues,
            coinLabels
          );
        },
        hoverBackgroundColor: getStackedHoverColor(
          idx,
          stackedValues,
          coinLabels
        ),

        data: stackedValues.map((ele) => ele[idx].volume),
        label: idx.toString(),
      };
    }),
  };

  return (
    <Bar data={volumeChartData} options={getVolumeChartOptions(coinLabels)} />
  );
};

export default VolumeComparisonChart;
