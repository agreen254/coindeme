"use client";

import type { ComparisonChartQueries } from "@/utils/types";

import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";

import ComparisonChartsTimeSelector from "./ComparisonChartsTimeSelector";
import PriceComparisonChartWrapper from "./PriceComparisonChartWrapper";
import VolumeComparisonChartWrapper from "./VolumeComparisonChartWrapper";

const ComparisonCharts = () => {
  const queryRequest: ComparisonChartQueries = {
    ids: ["bitcoin"],
    currency: "usd",
    days: "180",
  };
  const chartData = useComparisonChartQueries(queryRequest);
  const firstData = chartData[0].data;

  return (
    <div className="w-full">
      <div className="flex w-full h-[500px] justify-center gap-x-8">
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl w-[calc(50%-0.5rem)]">
          {firstData && <PriceComparisonChartWrapper chartData={firstData} />}
        </div>
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl w-[calc(50%-0.5rem)]">
          {firstData && <VolumeComparisonChartWrapper chartData={firstData} />}
        </div>
      </div>
      <div className="mt-4">
        <ComparisonChartsTimeSelector />
      </div>
    </div>
  );
};

export default ComparisonCharts;
