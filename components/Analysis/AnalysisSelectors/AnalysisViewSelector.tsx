"use client";

import { AnalysisView, analysisViews } from "@/utils/types";
import {
  useAnalysisActions,
  useAnalysisDataMode,
  useAnalysisView,
} from "@/hooks/useAnalysis";

const AnalysisViewSelector = () => {
  const mode = useAnalysisDataMode();
  const view = useAnalysisView();
  const { setView } = useAnalysisActions();

  function handleViewChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newView = e.currentTarget.value as AnalysisView;
    setView(newView);
  }

  return (
    <>
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
    </>
  );
};

export default AnalysisViewSelector;
