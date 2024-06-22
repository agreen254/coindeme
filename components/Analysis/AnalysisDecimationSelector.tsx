"use client";

import {
  useAnalysisActions,
  useAnalysisDecimationThreshold,
} from "@/hooks/useAnalysis";

const AnalysisDecimationSelector = () => {
  const thresholdOptions = [Infinity, 25, 50, 100, 150];
  const decimationThreshold = useAnalysisDecimationThreshold();
  const { setDecimationThreshold } = useAnalysisActions();

  function handleDecimationThresholdChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    let newThreshold = Number(e.currentTarget.value);
    newThreshold = Number.isNaN(newThreshold) ? Infinity : newThreshold;
    setDecimationThreshold(Number(newThreshold));
  }

  return (
    <>
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
    </>
  );
};

export default AnalysisDecimationSelector;
