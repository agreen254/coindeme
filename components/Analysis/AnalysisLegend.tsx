"use client";

import { PlusCircle as AddIcon, XCircle as DeleteIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { AnalysisSeries } from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { useAnalysisActions, emptySeries } from "@/hooks/useAnalysis";

import AnalysisAxisSelector from "./AnalysisSelectors/AnalysisAxisSelector";
import AnalysisRowWithProvider from "./AnalysisRow/AnalysisRow";

type Props = {
  series: AnalysisSeries[];
};

const AnalysisLegend = ({ series }: Props) => {
  const { addSeries, removeSeriesById } = useAnalysisActions();

  // cannot delete if it is the last data series with a valid id
  const cannotDelete = (id: string) =>
    series.length === 1 ||
    (!!id && series.some(s => s.id));

  // cannot add two new series with empty ids (duplicate keys)
  const hasEmptyId = series.some((s) => s.id === "");

  return (
    <>
      {series.map((s, idx) => (
        <div key={s.id} className="flex items-center ml-2 my-4">
          <button
            onClick={() => removeSeriesById(s.id)}
            className="transition-all hover:scale-110 disabled:cursor-not-allowed"
            disabled={cannotDelete(s.id)}
          >
            <DeleteIcon
              className={cn(
                "w-6 h-6 mr-4 inline text-red-500",
                cannotDelete(s.id) && "text-muted-foreground"
              )}
            />
            <span className="sr-only">Delete Series</span>
          </button>
          <div
            className="inline w-8 h-[6px] mr-2"
            style={{ backgroundColor: chartColorSets[idx].startColor.hex }}
          ></div>
          <span className="text-xl mr-6">{s.name}</span>
          <AnalysisRowWithProvider />
          {/* Do not allow user to change axis if there is not a valid id entered yet */}
          {s.id && <AnalysisAxisSelector series={s} />}
        </div>
      ))}
      {series.length < 3 && (
        <button onClick={() => addSeries(emptySeries)} disabled={hasEmptyId}>
          <AddIcon
            className={cn(
              "w-6 h-6 ml-2 mr-4 text-green-600 inline transition-all hover:scale-110",
              hasEmptyId && "text-muted-foreground"
            )}
          />
          <span className="text-xl">Add Series</span>
        </button>
      )}
    </>
  );
};

export default AnalysisLegend;
