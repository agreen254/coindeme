"use client";

import { useAnalysisActions } from "@/hooks/useAnalysis";
import { useAnalysisCoinAxes } from "@/hooks/useAnalysis";
import { useAnalysisCoins } from "@/hooks/useAnalysis";
import { cn } from "@/utils/cn";

const AnalysisAxisSelector = ({ index }: { index: number }) => {
  const { setCoinAxisPosition } = useAnalysisActions();
  const axis = useAnalysisCoinAxes()[index];
  const coin = useAnalysisCoins()[index];

  return (
    <div className="flex gap-x-4">
      <button
        disabled={!coin.name}
        className={cn(
          axis === "left" && "text-menu-highlight",
          !coin.name && "text-muted-foreground"
        )}
        onClick={() => setCoinAxisPosition("left", index)}
      >
        Left
      </button>
      <button
        disabled={!coin.name}
        className={cn(
          axis === "right" && "text-menu-highlight",
          !coin.name && "text-muted-foreground"
        )}
        onClick={() => setCoinAxisPosition("right", index)}
      >
        Right
      </button>
    </div>
  );
};

export default AnalysisAxisSelector;
