"use client";

import type { ComparisonChartQueries } from "@/utils/types";

import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";

import PriceComparisonChart from "./PriceComparisonChart";

const PriceComparisonChartWrapper = () => {
  const queryRequest: ComparisonChartQueries = {
    ids: ["bitcoin", "ethereum"],
    currency: "usd",
    days: 180,
  };

  const chartData = useComparisonChartQueries(queryRequest);

  return (
    chartData[0]?.data && <PriceComparisonChart data={chartData[0].data} />
  );
};

export default PriceComparisonChartWrapper;
