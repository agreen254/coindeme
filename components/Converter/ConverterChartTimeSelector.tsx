import { cn } from "@/utils/cn";
import { comparisonChartsTimeSelectorsMap } from "@/utils/maps";

type Props = {
  nDays: number;
  setNDays: React.Dispatch<React.SetStateAction<number>>;
  hasData: boolean;
};

const ConverterChartTimeSelector = ({ nDays, setNDays, hasData }: Props) => {
  const times = Array.from(comparisonChartsTimeSelectorsMap);

  return times.map(([displayTime, sendToApiTime]) => (
    <button
      key={sendToApiTime}
      className={cn(
        "min-w-[50px] px-3 py-2 rounded-md hover:bg-teal-900/80 text-stone-300 transition-colors disabled:cursor-not-allowed",
        nDays === parseInt(sendToApiTime) && "hover:bg-teal-800 bg-teal-900/80",
        !hasData && "text-muted animate-pulse"
      )}
      onClick={() => setNDays(parseInt(sendToApiTime))}
      disabled={!hasData}
    >
      {displayTime}
    </button>
  ));
};

export default ConverterChartTimeSelector;
