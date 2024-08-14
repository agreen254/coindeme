"use client";

import type { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

import type {
  ChartResponsiveValues,
  ComparisonChartResponse,
} from "@/utils/types";
import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";
import {
  getOptionsOverlapped,
  getOverlapBackgroundColor,
  getOverlapHoverColor,
  overlapData,
} from "@/utils/comparisonChartHelpers/compareVolumeHelpers";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useComparisonChartTime } from "@/hooks/useComparisonChartTime";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { useThemeTyped } from "@/hooks/useThemeTyped";
import { useNumVolumeBars } from "@/hooks/useNumVolumeBars";

type Props = {
  chartData: ComparisonChartResponse[];
  coinNames: string[];
  responsiveValues: ChartResponsiveValues;
};

const VolumeOverlapComparisonChart = ({
  chartData,
  coinNames,
  responsiveValues,
}: Props) => {
  const time = parseInt(useComparisonChartTime());
  const currency = useUserCurrencySetting();
  const coinLabels = useCarouselSelectedElements();
  const numBars = useNumVolumeBars();
  const { label: x, values } = prepareComparisonData(
    chartData,
    "total_volumes",
    numBars
  );
  const overlapValues = overlapData(values, coinLabels);
  const theme = useThemeTyped();

  const volumeChartData: ChartData<"bar"> = {
    labels: x,
    datasets: chartData.map((_, idx) => {
      return {
        backgroundColor: function (context) {
          return getOverlapBackgroundColor(
            idx,
            context,
            overlapValues,
            coinLabels,
            theme
          );
        },
        hoverBackgroundColor: function (context) {
          return getOverlapHoverColor(idx, context, overlapValues, coinLabels);
        },

        data: overlapValues.map((value) => value[idx].volume),
        label: idx.toString(),
        categoryPercentage: 0.9,
        barPercentage: 1,
      };
    }),
  };

  return (
    <Bar
      data={volumeChartData}
      options={getOptionsOverlapped(
        currency,
        overlapValues,
        time,
        coinNames,
        coinLabels,
        theme,
        responsiveValues
      )}
    />
  );
};

export default VolumeOverlapComparisonChart;
