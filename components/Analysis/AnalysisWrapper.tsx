"use client";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import DropdownProvider from "@/providers/DropdownProvider";

import AnalysisCoinsInput from "./AnalysisCoinsInput";

const AnalysisWrapper = () => {
  const dropdownKeys = ["analysisFirst", "analysisSecond", "analysisThird"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <DropdownProvider initialUnits={dropdownUnits}>
      <AnalysisCoinsInput index={0} dropdownId={dropdownKeys[0]} />
      <AnalysisCoinsInput index={1} dropdownId={dropdownKeys[1]} />
      <AnalysisCoinsInput index={2} dropdownId={dropdownKeys[2]} />
    </DropdownProvider>
  );
};

export default AnalysisWrapper;
