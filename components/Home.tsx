"use client";

import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useMarketParams } from "@/hooks/useMarketParams";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import ComparisonChartsWrapper from "@/components/ComparisonCharts/ComparisonChartsWrapper";
import MarketTableMainWrapper from "@/components/MarketTable/MarketTableMainWrapper";

const Home = () => {
  const currency = useUserCurrencySetting();
  const { field } = useMarketParams();

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
};
export default Home;
