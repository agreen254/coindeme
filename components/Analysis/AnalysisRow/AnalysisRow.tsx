"use client";

import { useState } from "react";

// import { useAnalysisActions, useAnalysisSeries } from "@/hooks/useAnalysis";
import { ANALYSIS_DROPDOWN_ID } from "@/validation/defaults";
import DropdownProvider from "@/providers/DropdownProvider";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import AnalysisRowInput from "./AnalysisRowInput";

type Props = {
  initId?: string;
};

const AnalysisRow = ({ initId }: Props) => {
  // const series = useAnalysisSeries();
  // const { addSeries, removeSeriesById } = useAnalysisActions();
  const [coinId, setCoinId] = useState<string>("");
  const [coinQuery, setCoinQuery] = useState<string>(initId ?? "");

  return (
    <span className="relative">
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

const AnalysisRowWithProvider = ({ initId }: Props) => {
  const unit = [initializeNewDropdown(ANALYSIS_DROPDOWN_ID)];

  return (
    <DropdownProvider initialUnits={unit}>
      <AnalysisRow initId={initId} />
    </DropdownProvider>
  );
};

export default AnalysisRowWithProvider;
