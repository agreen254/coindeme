import { cn } from "@/utils/cn";
import { comparisonChartsTimeSelectorsMap } from "@/utils/maps";
import {
  useComparisonChartTimeActions,
  useComparisonChartTimeIsSelected as isSelected,
} from "@/hooks/useComparisonChartTime";

import Panel from "../Theme/Panel";

type Props = {
  isPending: boolean;
};

const ComparisonChartsTimeSelector = ({ isPending }: Props) => {
  const { handleSelect } = useComparisonChartTimeActions();
  const times = Array.from(comparisonChartsTimeSelectorsMap);

  return (
    <Panel className="rounded-lg inline-flex p-1 gap-x-1">
      {times.map(([displayTime, sendToApiTime]) => (
        <button
          key={sendToApiTime}
          className={cn(
            "min-w-[50px] px-3 py-2 rounded-md dark:hover:bg-teal-900/80 hover:bg-teal-300 transition-colors disabled:cursor-not-allowed",
            isSelected(sendToApiTime) &&
              "dark:hover:bg-teal-800 hover:bg-teal-300 dark:bg-teal-900/80 bg-teal-500/80",
            isPending && "text-muted animate-pulse"
          )}
          onClick={() => handleSelect(sendToApiTime)}
          disabled={isPending}
        >
          {displayTime}
        </button>
      ))}
    </Panel>
  );
};

export default ComparisonChartsTimeSelector;
