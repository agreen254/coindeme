import { cn } from "@/utils/cn";
import { comparisonChartsTimeSelectorsMap } from "@/utils/maps";
import {
  useComparisonChartTimeActions,
  useComparisonChartTimeIsSelected as isSelected,
} from "@/hooks/useComparisonChartTime";

const ComparisonChartsTimeSelector = () => {
  const { handleSelect } = useComparisonChartTimeActions();
  const times = Array.from(comparisonChartsTimeSelectorsMap);

  return (
    <div className="rounded-lg inline-flex p-1 bg-zinc-900/70 border border-zinc-800">
      {times.map(([displayTime, sendToApiTime]) => (
        <button
          key={sendToApiTime}
          className={cn(
            "min-w-[60px] px-3 py-2 mr-1 rounded-md hover:bg-teal-900/80 text-stone-300 transition-colors",
            isSelected(sendToApiTime) && "hover:bg-teal-800 bg-teal-900/80"
          )}
          onClick={() => handleSelect(sendToApiTime)}
        >
          {displayTime}
        </button>
      ))}
    </div>
  );
};

export default ComparisonChartsTimeSelector;
