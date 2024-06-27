import { comparisonChartsTimeSelectorsMap } from "@/utils/maps";
import { useAnalysisActions, useAnalysisTimeLength } from "@/hooks/useAnalysis";

type TimesWrapper = {
  label: string;
  value: number;
};

const AnalysisTimeSelector = () => {
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
    <>
      <p className="text-sm font-medium uppercase dark:text-zinc-300 text-zinc-700 mb-1">
        Time
      </p>
      {times.map((time) => (
        <div key={time.label}>
          <input
            type="radio"
            id={time.label}
            value={time.value}
            className="mr-1 disabled:hover:cursor-not-allowed"
            checked={timeLength === time.value}
            onChange={handleTimeChange}
          />
          <label htmlFor={time.label}>{time.label}</label>
        </div>
      ))}
    </>
  );
};

export default AnalysisTimeSelector;
