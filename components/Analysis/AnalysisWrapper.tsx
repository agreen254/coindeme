"use client";

import { ErrorBoundary } from "react-error-boundary";

import {
  type AnalysisDataMode,
  analysisDataModes,
  AnalysisView,
  analysisViews,
} from "@/utils/types";
import { cn } from "@/utils/cn";
import {
  useAnalysisActions,
  useAnalysisDecimationThreshold,
  useAnalysisDataMode,
  useAnalysisSeries,
  useAnalysisTimeLength,
  useAnalysisView,
} from "@/hooks/useAnalysis";
import { useComparisonChartQueries } from "@/hooks/useComparisonChartQueries";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { useThemeTyped } from "@/hooks/useThemeTyped";

import AnalysisChart from "./AnalysisChart";
import AnalysisLegend from "./AnalysisLegend";
import Panel from "../Theme/Panel";
import Loader from "../Loader";
import AnalysisRowWithProvider from "./AnalysisRow/AnalysisRow";

const AnalysisWrapper = () => {
  const series = useAnalysisSeries();
  const timeLength = useAnalysisTimeLength();
  const mode = useAnalysisDataMode();
  const view = useAnalysisView();
  const currency = useUserCurrencySetting();
  const theme = useThemeTyped();
  const decimationThreshold = useAnalysisDecimationThreshold();
  const thresholdOptions = [Infinity, 25, 50, 100, 150];
  const { setDecimationThreshold, setDataMode, setView, setSeriesAxisById } =
    useAnalysisActions();

  const responses = useComparisonChartQueries({
    ids: series.map((s) => s.id),
    currency: currency,
    days: String(timeLength),
  });

  const someLoading = responses.some((r) => r.isPending);
  const allLoading = responses.every((r) => r.isPending);
  const noneSelected = series.length === 0;

  function handleModeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMode = e.currentTarget.value as AnalysisDataMode;

    if (newMode === "Rate of Return") {
      setView("Linear");
      series.forEach((s) => setSeriesAxisById(s.id, "left"));
    }
    setDataMode(newMode);
  }

  function handleViewChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newView = e.currentTarget.value as AnalysisView;
    setView(newView);
  }

  function handleDecimationThresholdChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    let newThreshold = Number(e.currentTarget.value);
    newThreshold = Number.isNaN(newThreshold) ? Infinity : newThreshold;
    setDecimationThreshold(Number(newThreshold));
  }

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
                series={series}
                rawData={responses.filter((r) => r.data).map((r) => r.data!)}
                mode={mode}
                currency={currency}
                theme={theme}
                timeLength={timeLength}
                decimationThreshold={decimationThreshold}
                view={view}
              />
            </div>
            <div className="flex gap-x-4 mt-4">
              <div className="w-1/2">
                <AnalysisLegend series={series} />
              </div>
              <div className="mr-4 w-1/2 flex justify-end gap-x-20">
                <div>
                  <p className="text-sm font-medium uppercase dark:text-zinc-300 text-zinc-700 mb-1">
                    View
                  </p>
                  {analysisViews.map((v) => (
                    <div key={v}>
                      <input
                        type="radio"
                        id={v}
                        value={v}
                        className="mr-1 disabled:hover:cursor-not-allowed"
                        disabled={mode === "Rate of Return"}
                        checked={view === v}
                        onChange={handleViewChange}
                      />
                      <label htmlFor={v}>{v}</label>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium uppercase dark:text-zinc-300 text-zinc-700 mb-1">
                    Decimation
                  </p>
                  {thresholdOptions.map((opt) => (
                    <div key={opt}>
                      <input
                        type="radio"
                        id={"compression" + opt.toString()}
                        value={opt}
                        className="mr-1 disabled:hover:cursor-not-allowed"
                        checked={decimationThreshold === opt}
                        onChange={handleDecimationThresholdChange}
                      />
                      <label htmlFor={"compression" + opt.toString()}>
                        {opt === Infinity ? "None" : `${opt} points`}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium uppercase dark:text-zinc-300 text-zinc-700 mb-1">
                    Data
                  </p>
                  {analysisDataModes.map((dataMode) => (
                    <div key={dataMode}>
                      <input
                        type="radio"
                        id={dataMode}
                        value={dataMode}
                        checked={dataMode === mode}
                        onChange={handleModeChange}
                        className="mr-1"
                      />
                      <label htmlFor={dataMode}>{dataMode}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ErrorBoundary>
        )}
      </Panel>
      <Panel className="mt-4">
        <AnalysisRowWithProvider initId="bitcoin" />
      </Panel>
    </div>
  );
};

export default AnalysisWrapper;
