"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { cn } from "@/utils/cn";

import DropdownProvider from "@/providers/DropdownProvider";
import { flatMarketRes } from "@/utils/flatMarketRes";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import ConverterChart from "./ConveterChart";
import ConverterChartTimeSelector from "./ConverterChartTimeSelector";
import Converter from "./Converter";
import Panel from "../Theme/Panel";

const ConverterWrapper = () => {
  const [nDays, setNDays] = useState(7);

  const currency = useUserCurrencySetting();
  const marketResponse = useMarketQuery(currency, "market_cap", "desc");

  const [coinOneId, setCoinOneId] = useState<string>("bitcoin");
  const [coinTwoId, setCoinTwoId] = useState<string>("ethereum");

  const coinOneData = flatMarketRes(marketResponse.data?.pages)?.find(
    (coin) => coin.id === coinOneId
  );
  const coinTwoData = flatMarketRes(marketResponse.data?.pages)?.find(
    (coin) => coin.id === coinTwoId
  );

  const [chartDataCoinOne, chartDataCoinTwo] = useComparisonChartQueries({
    ids: [coinOneId, coinTwoId],
    currency: currency,
    days: nDays.toString(),
  });

  const hasData = !!(
    chartDataCoinOne.data &&
    chartDataCoinTwo.data &&
    coinOneData &&
    coinTwoData
  );

  const dropdownKeys = ["converterFirst", "converterSecond"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <div>
      <DropdownProvider initialUnits={dropdownUnits}>
        <Converter
          converterKeys={dropdownKeys}
          response={marketResponse}
          coinOneId={coinOneId}
          coinTwoId={coinTwoId}
          coinOneData={coinOneData}
          coinTwoData={coinTwoData}
          setCoinOneId={setCoinOneId}
          setCoinTwoId={setCoinTwoId}
        />
      </DropdownProvider>
      <Panel
        className={cn(
          "w-[90vw] screen-xl:w-[1467px] aspect-square screen-xs:aspect-[5/4] screen-sm:aspect-[16/9] mt-4 mb-2 p-6 rounded-xl",
          !hasData && "animate-pulse"
        )}
      >
        {hasData && (
          <ErrorBoundary fallback={<></>}>
            <div className="h-full">
              <ConverterChart
                coinOneChartData={chartDataCoinOne.data}
                coinTwoChartData={chartDataCoinTwo.data}
                coinOneMarketData={coinOneData}
                coinTwoMarketData={coinTwoData}
                days={nDays}
              />
            </div>
          </ErrorBoundary>
        )}
      </Panel>
      <Panel className="rounded-lg inline-flex flex-wrap  mb-[20vh] p-1 gap-x-1 max-w-[90vw]">
        <ConverterChartTimeSelector
          nDays={nDays}
          setNDays={setNDays}
          hasData={hasData}
        />
      </Panel>
    </div>
  );
};

export default ConverterWrapper;
