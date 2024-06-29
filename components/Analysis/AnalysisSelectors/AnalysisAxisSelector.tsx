import { AnalysisAxis, AnalysisSeries } from "@/utils/types";
import { useAnalysisActions, useAnalysisDataMode } from "@/hooks/useAnalysis";

type Props = {
  series: AnalysisSeries;
};

const AnalysisAxisSelector = ({ series }: Props) => {
  const axes = ["left", "right"] as const;
  const mode = useAnalysisDataMode();
  const { setSeriesAxisById } = useAnalysisActions();

  function handleAxisChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newAxis = e.currentTarget.value as AnalysisAxis;
    setSeriesAxisById(series.id, newAxis);
  }

  return (
    <span className="flex">
      {axes.map((axis) => (
        <span key={series.id + axis} className="flex items-center">
          <input
            type="radio"
            id={series.id + axis}
            value={axis}
            checked={series.axis === axis}
            onChange={handleAxisChange}
            disabled={mode === "Rate of Return"}
            className="mr-1 disabled:cursor-not-allowed"
          />
          <label htmlFor={series.id + axis} className="text-sm uppercase mr-3">
            {axis}
          </label>
        </span>
      ))}
    </span>
  );
};

export default AnalysisAxisSelector;
