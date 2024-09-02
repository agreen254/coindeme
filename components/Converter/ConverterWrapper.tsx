"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { useCoinInfoQuery } from "@/hooks/useCoinInfoQuery";
import { cn } from "@/utils/cn";

import DropdownProvider from "@/providers/DropdownProvider";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";

import ConverterChart from "./ConveterChart";
import ConverterChartTimeSelector from "./ConverterChartTimeSelector";
import Converter from "./Converter";
import Panel from "../Theme/Panel";

const ConverterWrapper = () => {
  const [nDays, setNDays] = useState(7);

  const currency = useUserCurrencySetting();

  const [coinOneId, setCoinOneId] = useState<string>("bitcoin");
  const [coinTwoId, setCoinTwoId] = useState<string>("ethereum");

  const coinOneInfoQuery = useCoinInfoQuery(coinOneId);
  const coinTwoInfoQuery = useCoinInfoQuery(coinTwoId);

  const [chartDataCoinOne, chartDataCoinTwo] = useComparisonChartQueries({
    ids: [coinOneId, coinTwoId],
    currency: currency,
    days: nDays.toString(),
  });

  const hasData = !!(
    chartDataCoinOne.data &&
    chartDataCoinTwo.data &&
    coinOneInfoQuery.data &&
    coinTwoInfoQuery.data
  );

  const dropdownKeys = ["converterFirst", "converterSecond"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <div>
      <DropdownProvider initialUnits={dropdownUnits}>
        <Converter
          converterKeys={dropdownKeys}
          coinOneId={coinOneId}
          coinTwoId={coinTwoId}
          coinOneInfoQuery={coinOneInfoQuery}
          coinTwoInfoQuery={coinTwoInfoQuery}
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
                coinOneMarketData={coinOneInfoQuery.data}
                coinTwoMarketData={coinTwoInfoQuery.data}
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
