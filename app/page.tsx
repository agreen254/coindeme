"use client";

import { useMarketQuery } from "@/hooks/useMarketQuery";

import Carousel from "@/components/Carousel/Carousel";
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
    <main>
      <div className="mt-8">
        <Carousel queryResult={queryResult} />
      </div>
      {/* <div className="mt-8">
        <MarketTableMainWrapper queryResult={queryResult} />
      </div> */}
    </main>
  );
}
