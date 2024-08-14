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
          <div key={id} className="flex flex-wrap items-center ml-2 mb-8 screen-sm:my-4">
            <div className="-order-1 screen-sm:order-1">
              <AnalysisDeleteButton activeSeriesId={id} />
            </div>
            <div className="-order-2 screen-sm:order-2">
              <AnalysisLineColorPreview color={lineColor} />
            </div>
            <div className="-order-4 screen-sm:order-3">
              <AnalysisSeriesSelectorProvider series={s} index={idx} />
            </div>
            <div className="-order-3 screen-sm:order-4">
              {hasValidId && <AnalysisAxisSelector series={s} />}
            </div>
          </div>
        );
      })}
      {series.length < MAX_NUM_ANALYSIS_SERIES && <AnalysisAddButton />}
    </>
  );
};

export default AnalysisLegend;
