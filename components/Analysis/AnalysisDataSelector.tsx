"use client";

import { analysisCriteria } from "@/utils/types";
import { useAnalysisActions } from "@/hooks/useAnalysis";

const AnalysisDataSelector = () => {
  const { setCriteria, setYScale } = useAnalysisActions();

  return (
    <div>
      {analysisCriteria.map((c) => (
        <button
          key={c}
          className="p-4 mx-2 rounded-lg border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-700"
          onClick={() => {
            // make sure to change the scale to linear if using rate of return
            // to avoid trying to calculate log of negative number
            if (c === "Price (rate of return)") setYScale("linear");
            setCriteria(c);
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default AnalysisDataSelector;
