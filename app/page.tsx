"use client";

import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useSearchParams } from "next/navigation";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import ComparisonChartsWrapper from "@/components/ComparisonCharts/ComparisonChartsWrapper";
import MarketTableMainWrapper from "@/components/MarketTable/MarketTableMainWrapper";
import { DEFAULT_MARKET_FIELD } from "@/validation/defaults";
import { MarketFetchField } from "@/utils/types";

export default function Home() {
  const currency = useUserCurrencySetting();
  const searchParams = useSearchParams();
  const field = (searchParams.get("field") ||
    DEFAULT_MARKET_FIELD) as MarketFetchField;

  const queryResult = useMarketQuery(currency, field, "desc");
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
