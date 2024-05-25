import { cn } from "@/utils/cn";
import {
  useVolumeChartActions,
  useVolumeChartModeIsSelected as isSelected,
} from "@/hooks/useVolumeChartMode";

import Panel from "../Theme/Panel";

type Props = {
  isPending: boolean;
};

const VolumeChartSwitcher = ({ isPending }: Props) => {
  const { changeMode } = useVolumeChartActions();

  return (
    <Panel className="rounded-2xl inline-flex p-1 gap-x-1 font-light">
      <button
        className={cn(
          "min-w-[80px] px-3 py-2 rounded-xl dark:hover:bg-teal-900/80 hover:bg-teal-300 transition-colors disabled:cursor-not-allowed",
          isSelected("overlap") &&
            "dark:hover:bg-teal-800 dark:bg-teal-900/80 hover:bg-teal-300 bg-teal-500/80",
          isPending && "text-muted animate-pulse"
        )}
        onClick={() => changeMode("overlap")}
        disabled={isPending}
      >
        overlap
      </button>
      <button
        className={cn(
          "min-w-[80px] px-3 py-2 rounded-xl dark:hover:bg-teal-900/80 hover:bg-teal-300 transition-colors disabled:cursor-not-allowed",
          isSelected("stack") &&
            "dark:hover:bg-teal-800 hover:bg-teal-300 dark:bg-teal-900/80 bg-teal-500/80",
          isPending && "text-muted animate-pulse"
        )}
        onClick={() => changeMode("stack")}
        disabled={isPending}
      >
        stack
      </button>
    </Panel>
  );
};

export default VolumeChartSwitcher;
