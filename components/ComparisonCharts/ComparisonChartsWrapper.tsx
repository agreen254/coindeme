"use client";

import type { ComparisonChartQueries } from "@/utils/types";

import { cn } from "@/utils/cn";
import { isDefined } from "@/utils/isDefined";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useComparisonChartTime } from "@/hooks/useComparisonChartTime";

import ComparisonChartsTimeSelector from "./ComparisonChartsTimeSelector";
import PriceComparisonChartWrapper from "./PriceComparisonChartWrapper";
import VolumeComparisonChartWrapper from "./VolumeComparisonChartWrapper";

const ComparisonChartsWrapper = () => {
  const selected = useCarouselSelectedElements();
  const queryTime = useComparisonChartTime();
  const queryRequest: ComparisonChartQueries = {
    ids: selected,
    currency: "usd",
    days: queryTime,
  };
  const chartRes = useComparisonChartQueries(queryRequest);
  const chartData = chartRes.map((res) => res.data).filter(isDefined);

  const pulseChartBackground = chartRes.some((res) => res.isLoading);

  return (
    <div className="w-full">
      <div className="flex w-full h-[550px] justify-center gap-x-4">
        <div
          className={cn(
            "bg-zinc-900/70 border border-zinc-800 rounded-2xl w-1/2",
            pulseChartBackground && "animate-pulse"
          )}
        >
          <PriceComparisonChartWrapper chartData={chartData} />
        </div>
        <div
          className={cn(
            "bg-zinc-900/70 border border-zinc-800 rounded-2xl w-1/2",
            pulseChartBackground && "animate-pulse"
          )}
        >
          <VolumeComparisonChartWrapper chartData={chartData} />
        </div>
      </div>
      <div className="mt-[14px]">
        <ComparisonChartsTimeSelector isPending={pulseChartBackground} />
      </div>
    </div>
  );
};

export default ComparisonChartsWrapper;
