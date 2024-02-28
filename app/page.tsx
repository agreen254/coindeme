"use client";

import { useMarketQuery } from "@/hooks/useMarketQuery";

import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
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
    <main className="relative flex flex-col items-center gap-y-8">
      <CarouselWrapper axis="x" queryResult={queryResult} />
      <div className="flex justify-between w-table-xl"></div>
      <div>
        <MarketTableMainWrapper queryResult={queryResult} />
      </div>
    </main>
  );
}
