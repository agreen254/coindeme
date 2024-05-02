"use client";

import type { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

import type { MarketElementNoIdx } from "@/utils/types";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { getOptions } from "@/utils/comparisonChartHelpers/compareExchangeHelpers";

type ChartDataElement = NonNullable<
  ReturnType<typeof useComparisonChartQueries>[number]["data"]
>;

type Props = {
  coinOneChartData: ChartDataElement;
  coinTwoChartData: ChartDataElement;
  coinOneMarketData: MarketElementNoIdx;
  coinTwoMarketData: MarketElementNoIdx;
  days: number;
};

const ConverterChart = ({
  coinOneChartData,
  coinOneMarketData,
  coinTwoChartData,
  coinTwoMarketData,
  days,
}: Props) => {
  const coinRatioData = coinOneChartData.prices.map((p, idx) => {
    if (!coinTwoChartData.prices[idx]) return null;

    const price = p[1];
    const otherPrice = coinTwoChartData.prices[idx][1];
    const hasPrices = price && otherPrice;

    return hasPrices ? price / otherPrice : null;
  });

  const chartData: ChartData<"line"> = {
    labels: coinOneChartData.prices.map((p) => p[0]),
    datasets: [
      {
        backgroundColor: chartColorSets[0].endColor.hex,
        borderColor: chartColorSets[0].startColor.hex,
        data: coinRatioData,
      },
    ],
  };

  // add a key to the chart to prevent the awkward resizing animation
  return (
    <Line
      data={chartData}
      key={"chart" + days.toString()}
      options={getOptions({
        coinOneName: coinOneMarketData.name,
        coinOneSymbol: coinOneMarketData.symbol,
        coinTwoName: coinTwoMarketData.name,
        coinTwoSymbol: coinTwoMarketData.symbol,
        len: coinOneChartData.prices.length,
        days: days,
      })}
    />
  );
};

export default ConverterChart;
