"use client";

import type { ComparisonChartQueries } from "@/utils/types";

import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";

import PriceComparisonChart from "./PriceComparisonChart";

const PriceComparisonChartWrapper = () => {
  useCarouselSelectedElements();

  const queryRequest: ComparisonChartQueries = {
    ids: ["bitcoin"],
    currency: "usd",
    days: 180,
  };

  const chartData = useComparisonChartQueries(queryRequest);

  return (
    chartData[0]?.data && (
      <div className="w-full h-full">
        <PriceComparisonChart data={chartData[0].data} />
      </div>
    )
  );
};

export default PriceComparisonChartWrapper;
