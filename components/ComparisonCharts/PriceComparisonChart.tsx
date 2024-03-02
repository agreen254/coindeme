import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { decimationThreshold } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { largestTriangleThreeBuckets } from "@/utils/comparisonChartHelpers/LTTB";
import { priceComparisonOptions } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { priceComparisonGradient } from "@/utils/comparisonChartHelpers/comparePriceHelpers";

import { Line } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse;
};

const PriceComparisonChart = ({ chartData }: Props) => {
  const decimatedData: number[][] =
    chartData.prices.length > decimationThreshold
      ? largestTriangleThreeBuckets(chartData.prices, decimationThreshold)
      : chartData.prices;

  const x = decimatedData.map((price) => price[0]); // UNIX time
  const y = decimatedData.map((price) => price[1]); // price

  const priceChartData: ChartData<"line"> = {
    labels: x,
    datasets: [
      {
        label: "Bitcoin",
        backgroundColor: function (context) {
          return priceComparisonGradient(context);
        },
        borderColor: "rgba(52, 211, 153, 0.8)",
        data: y,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return <Line data={priceChartData} options={priceComparisonOptions} />;
};

export default PriceComparisonChart;
