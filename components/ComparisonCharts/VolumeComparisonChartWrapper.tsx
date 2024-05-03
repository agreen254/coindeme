"use client";

import { ErrorBoundary } from "react-error-boundary";

import type { ComparisonChartResponse } from "@/utils/types";
import { useCarouselHasNoneSelected } from "@/hooks/useCarousel";
import { useVolumeChartMode } from "@/hooks/useVolumeChartMode";

import ComparisonChartsLegend from "./ComparisonChartsLegend";
import VolumeOverlapComparisonChart from "./VolumeOverlapComparisonChart";
import VolumeStackComparisonChart from "./VolumeStackComparisonChart";

type Props = {
  chartData: ComparisonChartResponse[];
};

const PriceComparisonChartWrapper = ({ chartData }: Props) => {
  const hasNoneSelected = useCarouselHasNoneSelected();
  const hasNoData = chartData.length === 0;
  const mode = useVolumeChartMode();

  if (hasNoneSelected || hasNoData) {
    return (
      <p className="mt-4 font-light text-center text-stone-400/50">
        No data to display.
      </p>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <ErrorBoundary
        fallback={
          <p className="text-sm text-center text-destructive">
            Failed to render volume comparison chart.
          </p>
        }
      >
        <div className="h-[calc(100%-40px)]">
          {mode === "stack" ? (
            <VolumeStackComparisonChart chartData={chartData} />
          ) : (
            <VolumeOverlapComparisonChart chartData={chartData} />
          )}
        </div>
        <ComparisonChartsLegend />
      </ErrorBoundary>
    </div>
  );
};

export default PriceComparisonChartWrapper;
