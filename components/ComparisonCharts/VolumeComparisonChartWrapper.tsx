"use client";

import type { ComparisonChartResponse } from "@/utils/types";

import VolumeComparisonChart from "./VolumeComparisonChart";

type Props = {
  chartData: ComparisonChartResponse;
};

const PriceComparisonChartWrapper = ({ chartData }: Props) => {
  return (
    <div className="w-full h-full p-4">
      <VolumeComparisonChart chartData={chartData} />
    </div>
  );
};

export default PriceComparisonChartWrapper;

