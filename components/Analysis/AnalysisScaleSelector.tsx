import { useAnalysisActions } from "@/hooks/useAnalysis";
import { useAnalysisYScale } from "@/hooks/useAnalysis";
import { cn } from "@/utils/cn";

const AnalysisScaleSelector = () => {
  const scale = useAnalysisYScale();
  const { setYScale } = useAnalysisActions();

  return (
    <div>
      <button
        className={cn(scale === "linear" && "bg-sky-500")}
        onClick={() => setYScale("linear")}
      >
        Linear
      </button>
      <button
        className={cn(scale === "logarithmic" && "bg-sky-500")}
        onClick={() => setYScale("logarithmic")}
      >
        Logarithmic
      </button>
    </div>
  );
};

export default AnalysisScaleSelector;
