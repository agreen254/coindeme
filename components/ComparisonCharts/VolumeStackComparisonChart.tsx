import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import {
  chartOptionsStacked,
  volumeComparisonGradient,
} from "@/utils/comparisonChartHelpers/compareVolumeHelpers";
import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";

import { Bar } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse[];
};

const VolumeStackComparisonChart = ({ chartData }: Props) => {
  const coinLabels = useCarouselSelectedElements();
  const { label, values } = prepareComparisonData(chartData, "total_volumes");

  const volumeChartData: ChartData<"bar"> = {
    labels: label,

    datasets: chartData.map((_, idx) => {
      return {
        backgroundColor: function (context) {
          return volumeComparisonGradient(context, idx);
        },
        hoverBackgroundColor: chartColorSets[idx].highlightColor.hex,
        data: values[idx],
        label: coinLabels[idx],
      };
    }),
  };

  return <Bar data={volumeChartData} options={chartOptionsStacked} />;
};

export default VolumeStackComparisonChart;
