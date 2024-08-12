"use client";

import { PlusCircle as AddIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  emptySeries,
  useAnalysisActions,
  useAnalysisSeries,
} from "@/hooks/useAnalysis";

const AnalysisAddButton = () => {
  const { addSeries } = useAnalysisActions();
  const series = useAnalysisSeries();

  // cannot add two new series with empty ids (duplicate keys)
  const hasEmptyId = series.some((s) => s.id === "");

  return (
    <button onClick={() => addSeries(emptySeries)} disabled={hasEmptyId}>
      <AddIcon
        className={cn(
          "w-6 h-6 ml-2 mr-4 text-green-600 inline transition-all hover:scale-110",
          hasEmptyId && "text-muted-foreground"
        )}
      />
      <span className="text-sm screen-lg:text-base screen-xl:text-lg">
        Add Series
      </span>
    </button>
  );
};

export default AnalysisAddButton;
