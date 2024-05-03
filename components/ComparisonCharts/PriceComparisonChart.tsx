"use client";

import type { ChartData } from "chart.js";
import type { ComparisonChartResponse } from "@/utils/types";

import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";
import { getOptions } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { priceComparisonGradient } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useComparisonChartTime } from "@/hooks/useComparisonChartTime";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import { Line } from "react-chartjs-2";

type Props = {
  chartData: ComparisonChartResponse[];
};

const PriceComparisonChart = ({ chartData }: Props) => {
  const currency = useUserCurrencySetting();
  const selectedCoins = useCarouselSelectedElements();
  const { label, values } = prepareComparisonData(chartData, "prices");
  const time = useComparisonChartTime();

  const priceChartData: ChartData<"line"> = {
    labels: label,
    datasets: chartData.map((_, idx) => {
      return {
        backgroundColor: function (context) {
          return priceComparisonGradient(context, idx);
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
      options={getOptions(currency, parseInt(time))}
    />
  );
};

export default PriceComparisonChart;
