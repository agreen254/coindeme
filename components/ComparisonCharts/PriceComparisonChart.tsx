import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
} from "chart.js/auto";
import { priceComparisonOptions } from "@/utils/comparisonChartHelpers/comparePrice";
import { priceComparisonGradient } from "@/utils/comparisonChartHelpers/comparePrice";

import { ErrorBoundary } from "react-error-boundary";
import { Line } from "react-chartjs-2";

ChartJS.register(Filler, LineElement, PointElement);

type Props = {
  chartData: ComparisonChartResponse;
};

const PriceComparisonChart = ({ chartData }: Props) => {
  const x = chartData.prices.map((price) => price[0]); // UNIX time
  const y = chartData.prices.map((price) => price[1]); // price

  const priceChartData: ChartData<"line"> = {
    labels: x,
    datasets: [
      {
        label: "Bitcoin",

        // https://www.chartjs.org/docs/latest/samples/advanced/linear-gradient.html
        backgroundColor: function (context) {
          return priceComparisonGradient(context);
        },
        borderColor: "rgba(52, 211, 153, 0.8)",
        data: y,
        fill: true,
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
      <Line data={priceChartData} options={priceComparisonOptions} />
    </ErrorBoundary>
  );
};

export default PriceComparisonChart;
