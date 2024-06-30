"use client";

import { useAnalysisSeries } from "@/hooks/useAnalysis";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { MAX_NUM_ANALYSIS_SERIES } from "@/validation/defaults";

import AnalysisAxisSelector from "../AnalysisSelectors/AnalysisAxisSelector";
import AnalysisSeriesSelectorProvider from "../AnalysisSelectors/AnalysisSeriesSelectorProvider";
import AnalysisAddButton from "./AnalysisAddButton";
import AnalysisDeleteButton from "./AnalysisDeleteButton";
import AnalysisLineColorPreview from "./AnalysisLineColorPreview";

const AnalysisLegend = () => {
  const series = useAnalysisSeries();

  return (
    <>
      {series.map((s, idx) => {
        const { id } = s;
        const hasValidId = Boolean(id);
        const lineColor = chartColorSets[idx].startColor.hex;

        return (
          <div key={id} className="flex items-center ml-2 my-4">
            <AnalysisDeleteButton activeSeriesId={id} />
            <AnalysisLineColorPreview color={lineColor} />
            <AnalysisSeriesSelectorProvider series={s} index={idx} />
            {hasValidId && <AnalysisAxisSelector series={s} />}
          </div>
        );
      })}
      {series.length < MAX_NUM_ANALYSIS_SERIES && <AnalysisAddButton />}
    </>
  );
};

export default AnalysisLegend;
