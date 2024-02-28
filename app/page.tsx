"use client";

import { useMarketQuery } from "@/hooks/useMarketQuery";

import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import ComparisonCharts from "@/components/ComparisonCharts/ComparisonCharts";
import MarketTableMainWrapper from "@/components/MarketTable/MarketTableMainWrapper";

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
    <main className="flex flex-col items-center gap-y-4">
        <CarouselWrapper axis="x" queryResult={queryResult} />
      <div className="flex justify-between w-table-xl gap-x-12">
        <ComparisonCharts />
      </div>
      <div className="mt-8">
        <MarketTableMainWrapper queryResult={queryResult} />
      </div>
    </main>
  );
}
