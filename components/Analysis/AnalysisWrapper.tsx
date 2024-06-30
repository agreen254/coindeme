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
import Loader from "../Loader";
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
  const noneSelected = series.length === 0;

  return (
    <div className="w-full flex flex-col items-center justify-center mb-[20vh]">
      <Panel
        className={cn(
          "w-table-xl min-h-[800px] p-6",
          someLoading && "animate-pulse"
        )}
      >
        {noneSelected && (
          <p className="text-muted-foreground text-lg text-italic">
            No data to display.
          </p>
        )}
        {allLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
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
                <div>
                  <AnalysisViewSelector />
                </div>
                <div>
                  <AnalysisDecimationSelector />
                </div>
                <div>
                  <AnalysisTimeSelector />
                </div>
                <div>
                  <AnalysisDataSelector />
                </div>
              </div>
            </div>
          </ErrorBoundary>
        )}
      </Panel>
    </div>
  );
};

export default AnalysisWrapper;
