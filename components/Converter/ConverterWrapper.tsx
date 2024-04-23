"use client";

import DropdownProvider from "@/providers/DropdownProvider";
import Converter from "./Converter";

import { useState } from "react";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import { flatMarketRes } from "@/utils/flatMarketRes";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import ConverterChart from "./ConveterChart";

const ConverterWrapper = () => {
  const dropdownKeys = ["converterFirst", "converterSecond"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

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

  const chartDataResponse = useComparisonChartQueries({
    ids: [coinOneId, coinTwoId],
    currency: currency,
    days: "7",
  });

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
      <ConverterChart
        coinOneChartData={chartDataResponse[0]}
        coinTwoChartData={chartDataResponse[1]}
        coinOneMarketData={coinOneData}
        coinTwoMarketData={coinTwoData}
      />
    </div>
  );
};

export default ConverterWrapper;
