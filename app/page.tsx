"use client";

import { useMarketQuery } from "@/hooks/useMarketQuery";

import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import MarketTableMainWrapper from "@/components/MarketTable/MarketTableMainWrapper";
import SampleComparisonChart from "@/components/ComparisonCharts/SampleComparisonChart";

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
    <main>
      <div className="mt-8">
        <CarouselWrapper queryResult={queryResult} />
        <SampleComparisonChart />
      </div>
      <div className="mt-8">
        <MarketTableMainWrapper queryResult={queryResult} />
      </div>
    </main>
  );
}
