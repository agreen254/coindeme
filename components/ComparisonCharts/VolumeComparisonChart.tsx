import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { prepareComparisonChartAxes } from "@/utils/comparisonChartHelpers/prepareComparisonChartAxes";
import { volumeComparisonOptions } from "@/utils/comparisonChartHelpers/compareVolumeHelpers";
import { volumeComparisonGradient } from "@/utils/comparisonChartHelpers/compareVolumeHelpers";

import { Bar } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse;
};

const VolumeComparisonChart = ({ chartData }: Props) => {
  const { x, y } = prepareComparisonChartAxes(chartData.total_volumes);

  const volumeChartData: ChartData<"bar"> = {
    labels: x,
    datasets: [
      {
        label: "Bitcoin",
        backgroundColor: function (context) {
          return volumeComparisonGradient(context);
        },
        data: y,
        hoverBackgroundColor: "#34D3D5",
      },
    ],
  };

  return <Bar data={volumeChartData} options={volumeComparisonOptions} />;
};

export default VolumeComparisonChart;
