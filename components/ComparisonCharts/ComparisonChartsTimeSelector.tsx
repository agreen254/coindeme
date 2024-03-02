import { cn } from "@/utils/cn";
import { comparisonChartsTimeSelectorsMap } from "@/utils/maps";
import {
  useComparisonChartTimeActions,
  useComparisonChartTimeIsSelected as isSelected,
} from "@/hooks/useComparisonChartTime";

type Props = {
  isPending: boolean;
};

const ComparisonChartsTimeSelector = ({ isPending }: Props) => {
  const { handleSelect } = useComparisonChartTimeActions();
  const times = Array.from(comparisonChartsTimeSelectorsMap);

  return (
    <div className="rounded-lg inline-flex p-1 bg-zinc-900/70 border border-zinc-800 gap-x-1">
      {times.map(([displayTime, sendToApiTime]) => (
        <button
          key={sendToApiTime}
          className={cn(
            "min-w-[50px] px-3 py-2 rounded-md hover:bg-teal-900/80 text-stone-300 transition-colors",
            isSelected(sendToApiTime) && "hover:bg-teal-800 bg-teal-900/80",
            isPending && "text-muted animate-pulse"
          )}
          onClick={() => handleSelect(sendToApiTime)}
          disabled={isPending}
        >
          {displayTime}
        </button>
      ))}
    </div>
  );
};

export default ComparisonChartsTimeSelector;
