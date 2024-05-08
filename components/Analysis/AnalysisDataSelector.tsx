"use client";

import { analysisCriteria } from "@/utils/types";
import { useAnalysisActions } from "@/hooks/useAnalysis";

const AnalysisDataSelector = () => {
  const { setCriteria } = useAnalysisActions();

  return (
    <div>
      {analysisCriteria.map((c) => (
        <button
          key={c}
          className="p-4 border-zinc-800 bg-zinc-900/70 mx-2"
          onClick={() => setCriteria(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default AnalysisDataSelector;
