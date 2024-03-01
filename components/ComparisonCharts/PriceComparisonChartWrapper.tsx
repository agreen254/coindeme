"use client";

import type { ComparisonChartResponse } from "@/utils/types";

import { useCarouselHasNoneSelected } from "@/hooks/useCarousel";

import { ErrorBoundary } from "react-error-boundary";
import PriceComparisonChart from "./PriceComparisonChart";

type Props = {
  chartData: ComparisonChartResponse | undefined;
};

const PriceComparisonChartWrapper = ({ chartData }: Props) => {
  const hasNoneSelected = useCarouselHasNoneSelected();

  if (hasNoneSelected)
    return (
      <p className="mt-4 text-center text-stone-400">No data to display.</p>
    );

  return (
    <div className="w-full h-full p-4">
      <ErrorBoundary
        fallback={
          <p className="text-sm text-center text-destructive">
            Failed to render comparison price comparison chart.
          </p>
        }
      >
        {chartData && <PriceComparisonChart chartData={chartData} />}
      </ErrorBoundary>
    </div>
  );
};

export default PriceComparisonChartWrapper;
