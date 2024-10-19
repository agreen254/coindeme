"use client";

import { PlusCircle as AddIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  emptySeries,
  useAnalysisActions,
  useAnalysisSeries,
} from "@/hooks/useAnalysis";
import { useAnalysisChartIsLoading } from "@/hooks/useAnalysisChartIsLoading";

const AnalysisAddButton = () => {
  const { addSeries } = useAnalysisActions();
  const series = useAnalysisSeries();

  // cannot add two new series with empty ids (duplicate keys)
  const hasEmptyId = series.some((s) => s.id === "");

  const isLoading = useAnalysisChartIsLoading();

  const disabled = hasEmptyId || isLoading;

  return (
    <button onClick={() => addSeries(emptySeries)} disabled={disabled}>
      <AddIcon
        className={cn(
          "w-6 h-6 ml-2 mr-4 text-green-600 inline transition-all hover:scale-110",
          disabled && "text-muted-foreground"
        )}
      />
      <span className="text-sm screen-lg:text-base screen-xl:text-lg">
        Add Series
      </span>
    </button>
  );
};

export default AnalysisAddButton;
