"use client";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import DropdownProvider from "@/providers/DropdownProvider";

import AnalysisAxisSwitch from "./AnalysisAxisSwitch";
import AnalysisCoinInput from "./AnalysisCoinInput";
import AnalysisDataOptions from "./AnalysisDataOptions";

const AnalysisWrapper = () => {
  const dropdownKeys = ["analysisFirst", "analysisSecond", "analysisThird"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <DropdownProvider initialUnits={dropdownUnits}>
      <AnalysisDataOptions />
      <div className="grid grid-cols-3 w-table-xl">
        {dropdownKeys.map((k, i) => (
          <div
            key={k}
            className="relative m-8 p-4 bg-zinc-900/70 border border-zinc-800 rounded-lg"
          >
            <AnalysisCoinInput index={i} dropdownId={dropdownKeys[i]} />
            <AnalysisAxisSwitch index={i} />
          </div>
        ))}
      </div>
    </DropdownProvider>
  );
};

export default AnalysisWrapper;
