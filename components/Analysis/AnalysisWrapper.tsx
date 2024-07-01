"use client";

import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/utils/cn";
import { useAnalysisSeries, useAnalysisTimeLength } from "@/hooks/useAnalysis";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import AnalysisChart from "./AnalysisChart";
import AnalysisLegend from "./AnalysisLegend/AnalysisLegend";
import AnalysisViewSelector from "./AnalysisSelectors/AnalysisViewSelector";
import AnalysisDataSelector from "./AnalysisSelectors/AnalysisDataSelector";
import AnalysisDecimationSelector from "./AnalysisSelectors/AnalysisDecimationSelector";
import AnalysisTimeSelector from "./AnalysisSelectors/AnalysisTimeSelector";
import Panel from "../Theme/Panel";

const AnalysisWrapper = () => {
  const series = useAnalysisSeries();
  const timeLength = useAnalysisTimeLength();
  const currency = useUserCurrencySetting();

  const responses = useComparisonChartQueries({
    ids: series.filter((s) => s.id).map((s) => s.id),
    currency: currency,
    days: String(timeLength),
  });

  const someLoading = responses.some((r) => r.isPending);
  const allLoading = responses.every((r) => r.isPending);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Panel
        className={cn(
          "w-table-xl min-h-[1000px] p-6 mb-[20vh]",
          someLoading && "animate-pulse"
        )}
      >
        {!allLoading && (
          <ErrorBoundary
            fallback={
              <p className="text-center text-destructive text-2xl">
                Failed to load the analysis chart.
              </p>
            }
          >
            <div className="h-[700px]">
              <AnalysisChart
                rawData={responses.filter((r) => r.data).map((r) => r.data!)}
              />
            </div>
            <div className="flex gap-x-4 mt-4">
              <div className="w-1/2">
                <AnalysisLegend />
              </div>
              <div className="mr-4 w-1/2 flex justify-end gap-x-20">
                <AnalysisViewSelector />
                <AnalysisDecimationSelector />
                <AnalysisTimeSelector />
                <AnalysisDataSelector />
              </div>
            </div>
          </ErrorBoundary>
        )}
      </Panel>
    </div>
  );
};

export default AnalysisWrapper;
