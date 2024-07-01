"use client";

import { AnalysisSeries } from "@/utils/types";
import { ANALYSIS_DROPDOWN_ID } from "@/validation/defaults";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import DropdownProvider from "@/providers/DropdownProvider";
import AnalysisSeriesSelector from "./AnalysisSeriesSelector";

type Props = {
  series: AnalysisSeries;
  index: number;
};

const AnalysisSeriesSelectorProvider = ({ series, index }: Props) => {
  const unit = [initializeNewDropdown(ANALYSIS_DROPDOWN_ID)];

  return (
    <DropdownProvider initialUnits={unit}>
      <span className="relative">
        <AnalysisSeriesSelector
          series={series}
          index={index}
          dropdownId={ANALYSIS_DROPDOWN_ID}
        />
      </span>
    </DropdownProvider>
  );
};

export default AnalysisSeriesSelectorProvider;
