"use client";

import type { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

import type { MarketElementNoIdx } from "@/utils/types";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { getOptions } from "@/utils/comparisonChartHelpers/compareExchangeHelpers";

type Props = {
  coinOneChartData: ReturnType<typeof useComparisonChartQueries>[number];
  coinTwoChartData: ReturnType<typeof useComparisonChartQueries>[number];
  coinOneMarketData: MarketElementNoIdx | undefined;
  coinTwoMarketData: MarketElementNoIdx | undefined;
};

const ConverterChart = ({
  coinOneChartData,
  coinOneMarketData,
  coinTwoChartData,
  coinTwoMarketData,
}: Props) => {
  const hasChartData =
    coinOneChartData.data &&
    coinTwoChartData.data &&
    coinOneMarketData &&
    coinTwoMarketData;


  const coinRatioData = hasChartData
    ? coinOneChartData.data.prices.map((p, idx) => {
        const price = p[1];
        const otherPrice = coinTwoChartData.data.prices[idx][1];
        const hasPrices = price && otherPrice;

        return hasPrices ? price / otherPrice : null;
      })
    : [null];

  const chartData: ChartData<"line"> = {
    labels: hasChartData
      ? coinOneChartData.data.prices.map((p) => p[0])
      : undefined,
    datasets: [
      {
        backgroundColor: chartColorSets[0].endColor.hex,
        borderColor: chartColorSets[0].startColor.hex,
        data: coinRatioData,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col mt-4 p-6 rounded-xl bg-zinc-900/70 border border-zinc-800">
      <div className="h-[550px]">
        {hasChartData && (
          <Line
            data={chartData}
            options={getOptions({
              coinOneName: coinOneMarketData.name,
              coinOneSymbol: coinOneMarketData.symbol,
              coinTwoName: coinTwoMarketData.name,
              coinTwoSymbol: coinTwoMarketData.symbol,
              len: coinOneChartData.data.prices.length,
              days: 7,
            })}
          />
        )}
      </div>
    </div>
  );
};

export default ConverterChart;
