"use client";

import { useState } from "react";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import { useAnalysisCoins } from "@/hooks/useAnalysis";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import DropdownProvider from "@/providers/DropdownProvider";

import AnalysisAxisSelector from "./AnalysisAxisSelector";
import AnalysisCoinSelector from "./AnalysisCoinSelector";
import AnalysisDataSelector from "./AnalysisDataSelector";
import AnalysisTimeSelector from "./AnalysisTimeSelector";
import AnalysisScaleSelector from "./AnalysisScaleSelector";
import AnalysisChart from "./AnalysisChart";

const AnalysisWrapper = () => {
  const [nDays, setNDays] = useState<number>(7);
  const currency = useUserCurrencySetting();
  const coins = useAnalysisCoins();

  const coinData = useComparisonChartQueries({
    ids: coins.flatMap((c) => (c.id ? [c.id] : [])), // make sure unselected coins aren't queried
    currency: currency,
    days: nDays.toString(),
  });
  const hasData = coinData.every((c) => !!c.data);

  const dropdownKeys = ["analysisFirst", "analysisSecond", "analysisThird"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <DropdownProvider initialUnits={dropdownUnits}>
      <div className="w-table-xl flex flex-col">
        <div>
          <div className="w-full h-[800px]">
            {hasData && (
              <AnalysisChart data={coinData.map((c) => c.data)} coins={coins} />
            )}
          </div>
          <AnalysisDataSelector />
          <AnalysisTimeSelector nDays={nDays} setNDays={setNDays} hasData />
          <AnalysisScaleSelector />
        </div>
        <div className="grid grid-cols-3 w-table-xl">
          {dropdownKeys.map((k, i) => (
            <div
              key={k}
              className="relative m-8 p-4 bg-zinc-900/70 border border-zinc-800 rounded-lg"
            >
              <AnalysisCoinSelector index={i} dropdownId={dropdownKeys[i]} />
              <AnalysisAxisSelector index={i} />
            </div>
          ))}
        </div>
      </div>
    </DropdownProvider>
  );
};

export default AnalysisWrapper;
