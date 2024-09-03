"use client";

import type { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

import type {
  CoinOverviewResponse,
  ComparisonChartResponse,
} from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { getOptions } from "@/utils/comparisonChartHelpers/compareExchangeHelpers";
import { useThemeTyped } from "@/hooks/useThemeTyped";
import { useResponsiveChart } from "@/hooks/useResponsiveChart";

type Props = {
  coinOneChartData: ComparisonChartResponse;
  coinTwoChartData: ComparisonChartResponse;
  coinOneInfoData: CoinOverviewResponse;
  coinTwoInfoData: CoinOverviewResponse;
  days: number;
};

const ConverterChart = ({
  coinOneChartData,
  coinTwoChartData,
  coinOneInfoData,
  coinTwoInfoData,
  days,
}: Props) => {
  const theme = useThemeTyped();
  const responsiveValues = useResponsiveChart();

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
        backgroundColor: "rgba(255,255,255,0)",
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
        coinOneName: coinOneInfoData.name,
        coinOneSymbol: coinOneInfoData.symbol,
        coinTwoName: coinTwoInfoData.name,
        coinTwoSymbol: coinTwoInfoData.symbol,
        len: coinOneChartData.prices.length,
        days: days,
        theme: theme,
        responsiveValues: responsiveValues,
      })}
    />
  );
};

export default ConverterChart;
