"use client";

import type { ComparisonChartResponse } from "@/utils/types";

import PriceComparisonChart from "./PriceComparisonChart";

type Props = {
  chartData: ComparisonChartResponse;
};

const PriceComparisonChartWrapper = ({ chartData }: Props) => {
  return (
    <div className="w-full h-full p-4">
      <PriceComparisonChart chartData={chartData} />
    </div>
  );
};

export default PriceComparisonChartWrapper;
