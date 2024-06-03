"use client";

import { useMarketParams } from "@/hooks/useMarketParams";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import ComparisonChartsWrapper from "@/components/ComparisonCharts/ComparisonChartsWrapper";
import MarketTableMainWrapper from "@/components/MarketTable/MarketTableMainWrapper";

export default function Home() {
  const currency = useUserCurrencySetting();
  const { field, order } = useMarketParams();
  const queryResult = useMarketQuery(currency, field, order);

  return (
    <main className="flex flex-col items-center gap-y-4">
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
