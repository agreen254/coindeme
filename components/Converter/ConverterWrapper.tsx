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

  // the info query retrieves the coin name, id, symbol, and thumb
  const coinOneInfoResponse = useCoinInfoQuery(coinOneId);
  const coinTwoInfoResponse = useCoinInfoQuery(coinTwoId);

  // the comparison query retrieves the historical data needed for conversion rates
  const [coinOneChartResponse, coinTwoChartResponse] =
    useComparisonChartQueries({
      ids: [coinOneId, coinTwoId],
      currency: currency,
      days: nDays.toString(),
    });

  const hasData = !!(
    coinOneChartResponse.data &&
    coinTwoChartResponse.data &&
    coinOneInfoResponse.data &&
    coinTwoInfoResponse.data
  );

  const dropdownKeys = ["converterFirst", "converterSecond"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <main>
      <DropdownProvider initialUnits={dropdownUnits}>
        <Converter
          converterKeys={dropdownKeys}
          coinOneId={coinOneId}
          setCoinOneId={setCoinOneId}
          coinTwoId={coinTwoId}
          setCoinTwoId={setCoinTwoId}
          coinOneInfoResponse={coinOneInfoResponse}
          coinTwoInfoResponse={coinTwoInfoResponse}
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
                coinOneChartData={coinOneChartResponse.data}
                coinTwoChartData={coinTwoChartResponse.data}
                coinOneInfoData={coinOneInfoResponse.data}
                coinTwoInfoData={coinTwoInfoResponse.data}
                days={nDays}
              />
            </div>
          </ErrorBoundary>
        )}
      </Panel>
      <Panel className="rounded-lg inline-flex flex-wrap mb-[20vh] p-1 gap-x-1 max-w-[90vw]">
        <ConverterChartTimeSelector
          nDays={nDays}
          setNDays={setNDays}
          hasData={hasData}
        />
      </Panel>
    </main>
  );
};

export default ConverterWrapper;
