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
      {axes.map((ax) => (
        <>
          <input
            type="radio"
            id={series.id + ax}
            value={ax}
            checked={series.axis === ax}
            onChange={handleAxisChange}
            disabled={mode === "Rate of Return"}
            className="mr-1"
          />
          <label htmlFor={series.id + ax} className="text-lg mr-3">
            {ax}
          </label>
        </>
      ))}
    </span>
  );
};

export default AnalysisAxisSelector;
