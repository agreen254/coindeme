"use client";

import { useState } from "react";

import { AnalysisSeries } from "@/utils/types";
// import { useAnalysisActions } from "@/hooks/useAnalysis";
import { ANALYSIS_DROPDOWN_ID } from "@/validation/defaults";
import DropdownProvider from "@/providers/DropdownProvider";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import AnalysisRowInput from "./AnalysisRowInput";

type Props = {
  series?: AnalysisSeries;
  index: number;
};

const AnalysisRow = ({ series, index }: Props) => {
  // const { updateSeries } = useAnalysisActions();

  const [coinId, setCoinId] = useState<string>(series?.id || "");
  const [coinQuery, setCoinQuery] = useState<string>(series?.name ?? "");

  return (
    <span className="relative">
      {index}
      <AnalysisRowInput
        dropdownId={ANALYSIS_DROPDOWN_ID}
        coinId={coinId}
        setCoinId={setCoinId}
        query={coinQuery}
        setQuery={setCoinQuery}
        activeIdHandler={() => null}
      />
    </span>
  );
};

const AnalysisRowWithProvider = ({ series: initSeries, index }: Props) => {
  const unit = [initializeNewDropdown(ANALYSIS_DROPDOWN_ID)];

  return (
    <DropdownProvider initialUnits={unit}>
      <AnalysisRow series={initSeries} index={index} />
    </DropdownProvider>
  );
};

export default AnalysisRowWithProvider;
