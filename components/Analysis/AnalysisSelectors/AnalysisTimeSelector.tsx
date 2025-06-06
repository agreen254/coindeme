import { comparisonChartsTimeSelectorsMap } from "@/utils/maps";
import { useAnalysisActions, useAnalysisTimeLength } from "@/hooks/useAnalysis";
import { useAnalysisChartIsLoading } from "@/hooks/useAnalysisChartIsLoading";

type TimesWrapper = {
  label: string;
  value: number;
};

const AnalysisTimeSelector = () => {
  const isLoading = useAnalysisChartIsLoading();

  const timeLength = useAnalysisTimeLength();
  const { setTimeLength } = useAnalysisActions();
  const times = Array.from(comparisonChartsTimeSelectorsMap).reduce<
    TimesWrapper[]
  >((acc, curr) => [...acc, { label: curr[0], value: Number(curr[1]) }], []);

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newLength = Number(e.currentTarget.value);
    setTimeLength(newLength);
  }

  return (
    <div>
      <p className="text-sm font-medium uppercase dark:text-zinc-300 text-zinc-700 mb-1">
        Time
      </p>
      {times.map((time) => (
        <div key={time.label} className="flex items-center my-1">
          <input
            type="radio"
            id={time.label}
            disabled={isLoading}
            value={time.value}
            className="mr-1 disabled:hover:cursor-not-allowed"
            checked={timeLength === time.value}
            onChange={handleTimeChange}
          />
          <label htmlFor={time.label}>{time.label}</label>
        </div>
      ))}
    </div>
  );
};

export default AnalysisTimeSelector;
