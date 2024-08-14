"use client";

import type { ComparisonChartQueries } from "@/utils/types";

import { cn } from "@/utils/cn";
import { isDefined } from "@/utils/isDefined";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useComparisonChartTime } from "@/hooks/useComparisonChartTime";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { flatMarketRes } from "@/utils/flatMarketRes";

import CarouselClearButton from "../Carousel/CarouselClearButton";
import ComparisonChartsTimeSelector from "./ComparisonChartsTimeSelector";
import Panel from "../Theme/Panel";
import PriceComparisonChartWrapper from "./PriceComparisonChartWrapper";
import VolumeChartSwitcher from "./VolumeChartSwitcher";
import VolumeComparisonChartWrapper from "./VolumeComparisonChartWrapper";

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
    <div className="relative">
      <CarouselClearButton className="ml-4 mb-2 px-3 py-2 hover:bg-muted/70 rounded-md text-sm text-primary/70 font-light transition-colors disabled:cursor-not-allowed">
        Clear Selection
      </CarouselClearButton>
      <div className="grid screen-lg:grid-cols-2 gap-4">
        <Panel
          className={cn(
            "rounded-2xl h-[min(50vh,600px)] screen-xl:h-[600px]",
            pulseChartBackground && "animate-pulse"
          )}
        >
          <PriceComparisonChartWrapper
            chartData={chartData}
            coinNames={coinNames}
          />
        </Panel>
        <Panel
          className={cn(
            "rounded-2xl h-[min(50vh,600px)] screen-xl:h-[600px]",
            pulseChartBackground && "animate-pulse"
          )}
        >
          <VolumeComparisonChartWrapper
            chartData={chartData}
            coinNames={coinNames}
          />
        </Panel>
      </div>
      <div className="flex flex-wrap gap-2 justify-between mt-[10px] mb-4">
        <ComparisonChartsTimeSelector isPending={pulseChartBackground} />
        <VolumeChartSwitcher isPending={pulseChartBackground} />
      </div>
    </div>
  );
};

export default ComparisonChartsWrapper;
