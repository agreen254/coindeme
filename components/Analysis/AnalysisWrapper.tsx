"use client";

import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/utils/cn";
import {
  useAnalysisDataMode,
  useAnalysisSeries,
  useAnalysisTimeLength,
} from "@/hooks/useAnalysis";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { useThemeTyped } from "@/hooks/useThemeTyped";

import AnalysisChart from "./AnalysisChart";
import AnalysisLegend from "./AnalysisLegend";
import Panel from "../Theme/Panel";
import Loader from "../Loader";

const AnalysisWrapper = () => {
  const series = useAnalysisSeries();
  const timeLength = useAnalysisTimeLength();
  const mode = useAnalysisDataMode();
  const currency = useUserCurrencySetting();
  const theme = useThemeTyped();

  const responses = useComparisonChartQueries({
    ids: series.map((s) => s.id),
    currency: currency,
    days: String(timeLength),
  });

  const someLoading = responses.some((r) => r.isPending);
  const allLoading = responses.every((r) => r.isPending);
  const noneSelected = series.length === 0;

  return (
    <div className="w-full flex justify-center">
      <Panel
        className={cn(
          "w-table-xl min-h-[800px] p-6 mb-[20vh]",
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
                series={series}
                rawData={responses.filter((r) => r.data).map((r) => r.data!)}
                mode={mode}
                currency={currency}
                theme={theme}
                timeLength={timeLength}
              />
            </div>
            <AnalysisLegend series={series} />
          </ErrorBoundary>
        )}
      </Panel>
    </div>
  );
};

export default AnalysisWrapper;
