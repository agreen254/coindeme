"use client";

import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { ComparisonChartQueries } from "@/utils/types";

const SampleComparisonChart = () => {
  const queryRequest: ComparisonChartQueries = {
    ids: ["bitcoin"],
    currency: "usd",
    days: 180,
  };

  useComparisonChartQueries(queryRequest);
  return <p>Sample Comparison</p>;
};

export default SampleComparisonChart;
