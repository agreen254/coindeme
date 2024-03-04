"use client";

import type { ComparisonChartResponse } from "@/utils/types";

import { useCarouselHasNoneSelected } from "@/hooks/useCarousel";

import { ErrorBoundary } from "react-error-boundary";
import VolumeComparisonChart from "./VolumeComparisonChart";

type Props = {
  chartData: ComparisonChartResponse | undefined;
};

const PriceComparisonChartWrapper = ({ chartData }: Props) => {
  const hasNoneSelected = useCarouselHasNoneSelected();

  if (hasNoneSelected)
    return (
      <p className="mt-4 font-light text-center text-stone-400/50">No data to display.</p>
    );

  return (
    <div className="w-full h-full p-4">
      <ErrorBoundary
        fallback={
          <p className="text-sm text-center text-destructive">
            Failed to render volume comparison chart.
          </p>
        }
      >
        {chartData && <VolumeComparisonChart chartData={chartData} />}
      </ErrorBoundary>
    </div>
  );
};

export default PriceComparisonChartWrapper;
