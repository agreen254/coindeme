"use client";

import type { ComparisonChartQueries } from "@/utils/types";

import { cn } from "@/utils/cn";
import { isDefined } from "@/utils/isDefined";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useComparisonChartTime } from "@/hooks/useComparisonChartTime";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import CarouselClearButton from "../Carousel/CarouselClearButton";
import ComparisonChartsTimeSelector from "./ComparisonChartsTimeSelector";
import PriceComparisonChartWrapper from "./PriceComparisonChartWrapper";
import VolumeChartSwitcher from "./VolumeChartSwitcher";
import VolumeComparisonChartWrapper from "./VolumeComparisonChartWrapper";
import { flatMarketRes } from "@/utils/flatMarketRes";

const ComparisonChartsWrapper = () => {
  const currency = useUserCurrencySetting();
  const selected = useCarouselSelectedElements();

  const marketData = useMarketQuery(currency, "market_cap", "desc");
  const marketDataFlat = flatMarketRes(marketData.data?.pages);
  const coinNames = selected
    .map((id) => marketDataFlat?.find((coin) => coin.id === id))
    ?.map((coin) => coin?.name || "");

  const queryTime = useComparisonChartTime();
  const queryRequest: ComparisonChartQueries = {
    ids: selected,
    currency: currency,
    days: queryTime,
  };
  const chartRes = useComparisonChartQueries(queryRequest);
  const chartData = chartRes.map((res) => res.data).filter(isDefined);

  const pulseChartBackground = chartRes.some((res) => res.isLoading);

  return (
    <div className="w-full relative">
      <CarouselClearButton className="ml-4 mb-2 px-3 py-2 hover:bg-muted/70 rounded-md text-sm text-primary/70 font-light transition-colors disabled:cursor-not-allowed">
        Clear Selection
      </CarouselClearButton>
      <div className="flex w-full h-[600px] justify-center gap-x-4">
        <div
          className={cn(
            "bg-zinc-900/70 border border-zinc-800 rounded-2xl w-1/2",
            pulseChartBackground && "animate-pulse"
          )}
        >
          <PriceComparisonChartWrapper
            chartData={chartData}
            coinNames={coinNames}
          />
        </div>
        <div
          className={cn(
            "bg-zinc-900/70 border border-zinc-800 rounded-2xl w-1/2",
            pulseChartBackground && "animate-pulse"
          )}
        >
          <VolumeComparisonChartWrapper chartData={chartData} coinNames={coinNames} />
        </div>
      </div>
      <div className="flex justify-between mt-[10px] mb-4">
        <ComparisonChartsTimeSelector isPending={pulseChartBackground} />
        <VolumeChartSwitcher isPending={pulseChartBackground} />
      </div>
    </div>
  );
};

export default ComparisonChartsWrapper;
