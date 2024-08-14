"use client";

import { ErrorBoundary } from "react-error-boundary";

import type { ComparisonChartResponse } from "@/utils/types";
import { useCarouselHasNoneSelected } from "@/hooks/useCarousel";
import { useVolumeChartMode } from "@/hooks/useVolumeChartMode";

import ComparisonChartsLegend from "./ComparisonChartsLegend";
import VolumeOverlapComparisonChart from "./VolumeOverlapComparisonChart";
import VolumeStackComparisonChart from "./VolumeStackComparisonChart";
import { useResponsiveChart } from "@/hooks/useResponsiveChart";

type Props = {
  chartData: ComparisonChartResponse[];
  coinNames: string[];
};

const PriceComparisonChartWrapper = ({ chartData, coinNames }: Props) => {
  const hasNoneSelected = useCarouselHasNoneSelected();
  const hasNoData = chartData.length === 0;
  const mode = useVolumeChartMode();
  const responsiveValues = useResponsiveChart();

  if (hasNoneSelected || hasNoData) {
    return (
      <p className="mt-4 font-light text-center text-stone-400/50">
        No data to display.
      </p>
    );
  }

  return (
    <div className="h-full p-4 max-w-[90vw]">
      <ErrorBoundary
        fallback={
          <p className="text-sm text-center text-destructive">
            Failed to render volume comparison chart.
          </p>
        }
      >
        <div className="h-[calc(100%-40px)]">
          {mode === "stack" ? (
            <VolumeStackComparisonChart
              chartData={chartData}
              coinNames={coinNames}
              responsiveValues={responsiveValues}
            />
          ) : (
            <VolumeOverlapComparisonChart
              chartData={chartData}
              coinNames={coinNames}
              responsiveValues={responsiveValues}
            />
          )}
        </div>
        <ComparisonChartsLegend />
      </ErrorBoundary>
    </div>
  );
};

export default PriceComparisonChartWrapper;
