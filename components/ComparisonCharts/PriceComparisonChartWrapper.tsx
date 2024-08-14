"use client";

import { ErrorBoundary } from "react-error-boundary";

import type { ComparisonChartResponse } from "@/utils/types";
import { useCarouselHasNoneSelected } from "@/hooks/useCarousel";

import ComparisonChartsLegend from "./ComparisonChartsLegend";
import PriceComparisonChart from "./PriceComparisonChart";
import { useResponsiveChart } from "@/hooks/useResponsiveChart";

type Props = {
  chartData: ComparisonChartResponse[];
  coinNames: string[];
};

const PriceComparisonChartWrapper = ({ chartData, coinNames }: Props) => {
  const responsiveValues = useResponsiveChart();
  const hasNoneSelected = useCarouselHasNoneSelected();
  const hasNoData = chartData.length === 0;

  if (hasNoneSelected || hasNoData)
    return (
      <p className="mt-4 font-light text-center text-stone-400/50">
        No data to display.
      </p>
    );

  return (
    <div className="h-full p-4 max-w-[90vw]">
      <ErrorBoundary
        fallback={
          <p className="text-sm text-center text-destructive">
            Failed to render comparison price comparison chart.
          </p>
        }
      >
        <div className="h-[calc(100%-40px)]">
          <PriceComparisonChart
            chartData={chartData}
            coinNames={coinNames}
            responsiveValues={responsiveValues}
          />
        </div>
        <ComparisonChartsLegend />
      </ErrorBoundary>
    </div>
  );
};

export default PriceComparisonChartWrapper;
