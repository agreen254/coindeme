"use client";

import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { useCarouselSelectedElements } from "@/hooks/useCarousel";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { flatMarketRes } from "@/utils/flatMarketRes";

const ComparisonChartsLegend = () => {
  const selected = useCarouselSelectedElements();
  const currency = useUserCurrencySetting();
  const market = useMarketQuery(currency, "market_cap", "desc");
  const marketData = flatMarketRes(market.data?.pages);

  const legendData = selected.map((s) =>
    marketData?.find((ele) => ele.id === s)
  );

  return (
    legendData.length > 0 && (
      <div className="inline-flex items-center justify-center rounded-lg py-2 px-4 gap-x-6">
        {legendData.map((l, idx) => (
          <div key={"legend" + l?.id}>
            <div
              className="h-5 w-5 mr-[6px] translate-y-[4px] inline-block rounded-sm"
              style={{ backgroundColor: chartColorSets[idx].startColor.hex }}
            ></div>
            <span className="text-lg font-medium">{l?.name}</span>
          </div>
        ))}
      </div>
    )
  );
};

export default ComparisonChartsLegend;
