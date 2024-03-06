"use client";

import { renderErrorToast } from "@/components/Toast/ErrorToast";
import { useMarketQuery } from "@/hooks/useMarketQuery";

import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import ComparisonChartsWrapper from "@/components/ComparisonCharts/ComparisonChartsWrapper";
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
      <button
        className="px-5 py-3 bg-teal-800 rounded-lg"
        onClick={() => renderErrorToast("An error has occurred.")}
      >
        Make me some toast!
      </button>
      <CarouselWrapper axis="x" queryResult={queryResult} />
      <div className="flex justify-between w-table-xl gap-x-12">
        <ComparisonChartsWrapper />
      </div>
      <div className="mt-2">
        <MarketTableMainWrapper queryResult={queryResult} />
      </div>
    </main>
  );
}
