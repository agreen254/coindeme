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
      <CarouselWrapper queryResult={queryResult} />
      <div className="w-[90vw] screen-xl:w-table-xl gap-x-12">
        <ComparisonChartsWrapper />
      </div>
      <div className="mt-2 w-table-xl overflow-x-auto">
        <MarketTableMainWrapper queryResult={queryResult} />
      </div>
    </main>
  );
};
export default Home;
