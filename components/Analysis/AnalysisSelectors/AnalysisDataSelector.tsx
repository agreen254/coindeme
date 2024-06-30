"use client";

import { analysisDataModes, AnalysisDataMode } from "@/utils/types";
import {
  useAnalysisActions,
  useAnalysisDataMode,
  useAnalysisSeries,
} from "@/hooks/useAnalysis";

const AnalysisDataSelector = () => {
  const { setDataMode, setSeriesAxisById, setView } = useAnalysisActions();
  const mode = useAnalysisDataMode();
  const series = useAnalysisSeries();

  function handleModeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMode = e.currentTarget.value as AnalysisDataMode;

    if (newMode === "Rate of Return") {
      setView("Linear");
      series.forEach((s) => setSeriesAxisById(s.id, "left"));
    }
    setDataMode(newMode);
  }

  return (
    <div>
      <p className="text-sm font-medium uppercase dark:text-zinc-300 text-zinc-700 mb-1">
        Data
      </p>
      {analysisDataModes.map((dataMode) => (
        <div key={dataMode} className="flex items-center my-1">
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
  );
};

export default AnalysisDataSelector;
