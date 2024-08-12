"use client";

import { XCircle as DeleteIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAnalysisActions, useAnalysisSeries } from "@/hooks/useAnalysis";

type Props = {
  activeSeriesId: string;
};

const AnalysisDeleteButton = ({ activeSeriesId }: Props) => {
  const { removeSeriesById } = useAnalysisActions();
  const storedSeries = useAnalysisSeries();

  // cannot delete if it is the only data series total or the only one with a valid id
  const cannotDelete = (id: string) =>
    storedSeries.length === 1 ||
    (!!id && storedSeries.filter((s) => s.id).length === 1);

  return (
    <button
      onClick={() => removeSeriesById(activeSeriesId)}
      className="transition-all hover:scale-110 disabled:cursor-not-allowed"
      disabled={cannotDelete(activeSeriesId)}
    >
      <DeleteIcon
        className={cn(
          "w-6 h-6 mr-2 screen-sm:mr-4 inline text-red-500",
          cannotDelete(activeSeriesId) && "text-muted-foreground"
        )}
      />
      <span className="sr-only">Delete Series</span>
    </button>
  );
};

export default AnalysisDeleteButton;
