import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { volumeComparisonOptions } from "@/utils/comparisonChartHelpers/compareVolumeHelpers";
import { volumeComparisonGradient } from "@/utils/comparisonChartHelpers/compareVolumeHelpers";

import { Bar } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse[];
};

const VolumeComparisonChart = ({ chartData }: Props) => {
  const selectedCoins = useCarouselSelectedElements();
  const { label, values } = prepareComparisonData(chartData, "total_volumes");

  const volumeChartData: ChartData<"bar"> = {
    labels: label,
    datasets: chartData.map((_, idx) => {
      return {
        backgroundColor: function (context) {
          return volumeComparisonGradient(context, idx);
        },
        data: values[idx],
        label: selectedCoins[idx],
        hoverBackgroundColor: chartColorSets[idx].highlightColor.hex,
      };
    }),
  };

  return <Bar data={volumeChartData} options={volumeComparisonOptions} />;
};

export default VolumeComparisonChart;
