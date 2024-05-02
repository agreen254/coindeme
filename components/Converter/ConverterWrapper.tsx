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
      <div
        className={cn(
          "w-full h-[600px] flex flex-col mt-4 mb-2 p-6 rounded-xl bg-zinc-900/70 border border-zinc-800",
          !hasData && "animate-pulse"
        )}
      >
        {hasData && (
          <ErrorBoundary fallback={<></>}>
            <ConverterChart
              coinOneChartData={chartDataCoinOne.data}
              coinTwoChartData={chartDataCoinTwo.data}
              coinOneMarketData={coinOneData}
              coinTwoMarketData={coinTwoData}
              days={nDays}
            />
          </ErrorBoundary>
        )}
      </div>

      <div className="rounded-lg inline-flex justify-end mb-[20vh] p-1 bg-zinc-900/70 border border-zinc-800 gap-x-1">
        <ConverterChartTimeSelector
          nDays={nDays}
          setNDays={setNDays}
          hasData={hasData}
        />
      </div>
    </div>
  );
};

export default ConverterWrapper;
