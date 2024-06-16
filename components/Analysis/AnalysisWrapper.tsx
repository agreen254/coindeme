"use client";

import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/utils/cn";
import {
  useAnalysisDataMode,
  useAnalysisScale,
  useAnalysisSeries,
  useAnalysisTimeLength,
} from "@/hooks/useAnalysis";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { useThemeTyped } from "@/hooks/useThemeTyped";

import AnalysisChart from "./AnalysisChart";
import Panel from "../Theme/Panel";

const AnalysisWrapper = () => {
  const series = useAnalysisSeries();
  const timeLength = useAnalysisTimeLength();
  const mode = useAnalysisDataMode();
  const scale = useAnalysisScale();
  const currency = useUserCurrencySetting();
  const theme = useThemeTyped();

  const responses = useComparisonChartQueries({
    ids: series.map((s) => s.id),
    currency: currency,
    days: String(timeLength),
  });

  const someLoading = responses.some((r) => r.isPending);

  return (
    <div className="w-full flex justify-center">
      <Panel
        className={cn(
          "w-table-xl h-[800px] p-6",
          someLoading && "animate-pulse"
        )}
      >
        {someLoading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : (
          <ErrorBoundary
            fallback={
              <p className="text-center text-destructive text-2xl">
                Failed to load the analysis chart.
              </p>
            }
          >
            <AnalysisChart
              series={series}
              rawData={responses.map((r) => r.data!)}
              mode={mode}
              scale={scale}
              currency={currency}
              theme={theme}
              timeLength={timeLength}
            />
          </ErrorBoundary>
        )}
      </Panel>
    </div>
  );
};

export default AnalysisWrapper;
