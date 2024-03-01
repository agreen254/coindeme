import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { priceComparisonOptions } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { priceComparisonGradient } from "@/utils/comparisonChartHelpers/comparePriceHelpers";

import { Line } from "react-chartjs-2";

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
        backgroundColor: function (context) {
          return priceComparisonGradient(context);
        },
        borderColor: "rgba(52, 211, 153, 0.8)",
        data: y,
        fill: true,
      },
    ],
  };

  return <Line data={priceChartData} options={priceComparisonOptions} />;
};

export default PriceComparisonChart;
