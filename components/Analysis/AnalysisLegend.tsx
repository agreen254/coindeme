"use client";

import { PlusCircle as AddIcon, XCircle as DeleteIcon } from "lucide-react";

import { AnalysisSeries } from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { useAnalysisActions, emptySeries } from "@/hooks/useAnalysis";

import AnalysisAxisSelector from "./AnalysisSelectors/AnalysisAxisSelector";

type Props = {
  series: AnalysisSeries[];
};

const AnalysisLegend = ({ series }: Props) => {
  const { addSeries, removeSeriesById } = useAnalysisActions();

  return (
    <>
      {series.map((s, idx) => (
        <div key={s.id} className="flex items-center ml-2 my-4">
          <button
            onClick={() => removeSeriesById(s.id)}
            className="transition-all hover:scale-110"
          >
            <DeleteIcon className="w-6 h-6 mr-4 text-red-500 inline" />
            <span className="sr-only">Delete Series</span>
          </button>
          <div
            className="inline w-8 h-[6px] mr-2"
            style={{ backgroundColor: chartColorSets[idx].startColor.hex }}
          ></div>
          <span className="text-xl mr-6">{s.name}</span>
          {s.id && <AnalysisAxisSelector series={s} />}
        </div>
      ))}
      {series.length < 3 && (
        <button onClick={() => addSeries(emptySeries)}>
          <AddIcon className="w-6 h-6 ml-2 mr-4 text-green-600 inline transition-all hover:scale-110" />
          <span className="text-lg">Add Series</span>
        </button>
      )}
    </>
  );
};

export default AnalysisLegend;
