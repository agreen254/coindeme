import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js/auto";
import { volumeComparisonOptions } from "@/utils/comparisonChartHelpers/compareVolume";
import { volumeComparisonGradient } from "@/utils/comparisonChartHelpers/compareVolume";

import { Bar } from "react-chartjs-2";
import { ErrorBoundary } from "react-error-boundary";

ChartJS.register(
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
);

type Props = {
  chartData: ComparisonChartResponse;
};

const VolumeComparisonChart = ({ chartData }: Props) => {
  const x = chartData.total_volumes.map((volume) => volume[0]); // UNIX time
  const y = chartData.total_volumes.map((volume) => volume[1]); // volume

  const volumeChartData: ChartData<"bar"> = {
    labels: x,
    datasets: [
      {
        label: "Bitcoin",

        // https://www.chartjs.org/docs/latest/samples/advanced/linear-gradient.html
        backgroundColor: function (context) {
          return volumeComparisonGradient(context);
        },
        data: y,
      },
    ],
  };

  return (
    <ErrorBoundary
      fallback={
        <p className="text-sm text-center text-destructive">
          Failed to render comparison chart for bitcoin.
        </p>
      }
    >
      <Bar data={volumeChartData} options={volumeComparisonOptions} />
    </ErrorBoundary>
  );
};

export default VolumeComparisonChart;
