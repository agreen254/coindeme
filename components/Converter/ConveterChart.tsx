import type { ChartData } from "chart.js";
import type { MarketElementNoIdx } from "@/utils/types";

import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";

import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { getOptions } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { priceComparisonGradient } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { Line } from "react-chartjs-2";

type Props = {
  coinOneChartData: ReturnType<typeof useComparisonChartQueries>[number];
  coinTwoChartData: ReturnType<typeof useComparisonChartQueries>[number];
  coinOneMarketData: MarketElementNoIdx | undefined;
  coinTwoMarketData: MarketElementNoIdx | undefined;
};

const ConverterChart = ({
  coinOneChartData,
  coinTwoChartData,
}: Props) => {
  const hasChartData = coinOneChartData.data && coinTwoChartData.data;

  const coinRatioData = (() => {
    return hasChartData
      ? coinOneChartData.data.prices.map((p, idx) => {
          const price = p[1];
          const otherPrice = coinTwoChartData.data.prices[idx][1];
          const hasPrices = price && otherPrice;

          return hasPrices ? price / otherPrice : null;
        })
      : [null];
  })();

  const chartData: ChartData<"line"> = {
    labels: hasChartData
      ? coinOneChartData.data.prices.map((p) => p[0])
      : undefined,
    datasets: [
      {
        backgroundColor: function (context) {
          return priceComparisonGradient(context, 0);
        },
        borderColor: chartColorSets[0].startColor.hex,
        data: coinRatioData,
      },
    ],
  };

  return (
    <div className="w-full h-[650px] mt-4 p-6 rounded-xl bg-zinc-900/70 border border-zinc-800">
      <Line data={chartData} options={getOptions("usd")} />
    </div>
  );
};

export default ConverterChart;
