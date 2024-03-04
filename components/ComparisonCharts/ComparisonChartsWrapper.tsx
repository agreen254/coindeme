"use client";

import type {
  ComparisonChartResponse,
  ComparisonChartQueries,
} from "@/utils/types";

import { cn } from "@/utils/cn";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useComparisonChartTime } from "@/hooks/useComparisonChartTime";
import { useEffect, useState } from "react";

import ComparisonChartsTimeSelector from "./ComparisonChartsTimeSelector";
import PriceComparisonChartWrapper from "./PriceComparisonChartWrapper";
import VolumeComparisonChartWrapper from "./VolumeComparisonChartWrapper";

const ComparisonChartsWrapper = () => {
  const [recentData, setRecentData] = useState<ComparisonChartResponse>();

  const selectedCoins = useCarouselSelectedElements();

  const queryTime = useComparisonChartTime();
  const queryRequest: ComparisonChartQueries = {
    ids: selectedCoins,
    currency: "usd",
    days: queryTime,
  };
  const chartRes = useComparisonChartQueries(queryRequest);

  // assume only 1 dataset for now
  const hasChartData = chartRes[0]?.data;

  /**
   * This useEffect enables displaying the previously fetched comparison data
   * as a placeholder while the backend is fetching additional data.
   * The user does not want to see a blank chart flashing each time they click on a new time,
   * the application should only show a loading skeleton when loading the first comparison dataset.
   *
   * This is normally possible using the 'placeholderData' property of the useQuery method.
   * But, because the user can select an uncertain number of carousel elements, the property does not behave normally.
   *
   * From the docs:
   * The placeholderData option exists for useQueries as well, but it doesn't get information
   * passed from previously rendered Queries like useQuery does because the input to useQueries
   * can be a different number of Queries on each render.
   * https://tanstack.com/query/latest/docs/framework/react/reference/useQueries
   *
   * Fortunately, for this use case, the variable number of queries is not important.
   * The charts will be extended to handle each case, and the uncertain length array of query responses can just
   * be passed into the chart wrapper (once the multi-dataset charts are implemented!!).
   */
  useEffect(() => {
    hasChartData && setRecentData(chartRes[0].data);
  }, [chartRes]);

  return (
    <div className="w-full">
      <div className="flex w-full h-[550px] justify-center gap-x-4">
        <div
          className={cn(
            "bg-zinc-900/70 border border-zinc-800 rounded-2xl w-1/2",
            !recentData && "animate-pulse"
          )}
        >
          <PriceComparisonChartWrapper chartData={recentData} />
        </div>
        <div
          className={cn(
            "bg-zinc-900/70 border border-zinc-800 rounded-2xl w-1/2",
            !recentData && "animate-pulse"
          )}
        >
          <VolumeComparisonChartWrapper chartData={recentData} />
        </div>
      </div>
      {chartRes.map(
        (res, idx) =>
          res.error && (
            <p
              key={queryRequest.ids[idx] + "ChartErrorMessage"}
              className="text-destructive mt-1 ml-1"
            >
              An unexpected error occurred for fetch {queryRequest.ids[idx]}:{" "}
              {res.error.message}
            </p>
          )
      )}
      <div className="mt-[14px]">
        <ComparisonChartsTimeSelector isPending={chartRes[0]?.isLoading} />
      </div>
    </div>
  );
};

export default ComparisonChartsWrapper;
