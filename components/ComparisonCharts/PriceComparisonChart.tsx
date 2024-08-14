"use client";

import type { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

import type {
  ChartResponsiveValues,
  ComparisonChartResponse,
} from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";
import { getOptions } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { priceComparisonGradient } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useComparisonChartTime } from "@/hooks/useComparisonChartTime";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { useThemeTyped } from "@/hooks/useThemeTyped";

type Props = {
  chartData: ComparisonChartResponse[];
  coinNames: string[];
  responsiveValues: ChartResponsiveValues;
};

const PriceComparisonChart = ({
  chartData,
  coinNames,
  responsiveValues,
}: Props) => {
  const currency = useUserCurrencySetting();
  const selectedCoins = useCarouselSelectedElements();
  const { label, values } = prepareComparisonData(chartData, "prices");
  const time = useComparisonChartTime();
  const theme = useThemeTyped();

  const priceChartData: ChartData<"line"> = {
    labels: label,
    datasets: chartData.map((_, idx) => {
      return {
        backgroundColor: function (context) {
          return priceComparisonGradient(context, idx, theme);
        },
        borderColor: chartColorSets[idx].startColor.hex,
        data: values[idx],
        label: selectedCoins[idx],
        pointHoverBorderColor: chartColorSets[idx].highlightColor.hex,
      };
    }),
  };

  return (
    <Line
      data={priceChartData}
      options={getOptions(
        currency,
        parseInt(time),
        coinNames,
        theme,
        responsiveValues
      )}
    />
  );
};

export default PriceComparisonChart;
