"use client";

import { useMarketQuery } from "@/hooks/useMarketQuery";

import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import MarketTableMainWrapper from "@/components/MarketTable/MarketTableMainWrapper";
import PriceComparisonChartWrapper from "@/components/ComparisonCharts/PriceComparisonChartWrapper";

export default function Home() {
  // TODO: get the three fields below from url search params
  const currency = "usd";
  const marketFetchParam = "market_cap";
  const marketFetchOrder = "desc";

  const queryResult = useMarketQuery(
    currency,
    marketFetchParam,
    marketFetchOrder
  );

  return (
    <main className="flex flex-col items-center gap-y-8">
      <div className="flex justify-between w-table-xl">
        <CarouselWrapper queryResult={queryResult} />
        <PriceComparisonChartWrapper />
      </div>
      <div className="mt-8">
        <MarketTableMainWrapper queryResult={queryResult} />
      </div>
    </main>
  );
}
