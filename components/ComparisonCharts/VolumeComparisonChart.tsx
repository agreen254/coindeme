import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { decimationThreshold } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { largestTriangleThreeBuckets } from "@/utils/comparisonChartHelpers/LTTB";
import { volumeComparisonOptions } from "@/utils/comparisonChartHelpers/compareVolumeHelpers";
import { volumeComparisonGradient } from "@/utils/comparisonChartHelpers/compareVolumeHelpers";

import { Bar } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse;
};

const VolumeComparisonChart = ({ chartData }: Props) => {
  const decimatedData: number[][] =
    chartData.total_volumes.length > decimationThreshold
      ? largestTriangleThreeBuckets(chartData.total_volumes, decimationThreshold)
      : chartData.total_volumes;

  const x = decimatedData.map((volume) => volume[0]); // UNIX time
  const y = decimatedData.map((volume) => volume[1]); // volume

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
