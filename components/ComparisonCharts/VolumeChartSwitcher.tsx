import { cn } from "@/utils/cn";
import {
  useVolumeChartActions,
  useVolumeChartModeIsSelected as isSelected,
} from "@/hooks/useVolumeChartMode";

type Props = {
  isPending: boolean;
};

const VolumeChartSwitcher = ({ isPending }: Props) => {
  const { changeMode } = useVolumeChartActions();

  return (
    <div className="rounded-2xl inline-flex p-1 bg-zinc-900/70 border border-zinc-800 gap-x-1 font-light">
      <button
        className={cn(
          "min-w-[80px] px-3 py-2 rounded-xl hover:bg-teal-900/80 text-stone-300 transition-colors disabled:cursor-not-allowed",
          isSelected("overlap") && "hover:bg-teal-800 bg-teal-900/80",
          isPending && "text-muted animate-pulse"
        )}
        onClick={() => changeMode("overlap")}
        disabled={isPending}
      >
        overlap
      </button>
      <button
        className={cn(
          "min-w-[80px] px-3 py-2 rounded-xl hover:bg-teal-900/80 text-stone-300 transition-colors disabled:cursor-not-allowed",
          isSelected("stack") && "hover:bg-teal-800 bg-teal-900/80",
          isPending && "text-muted animate-pulse"
        )}
        onClick={() => changeMode("stack")}
        disabled={isPending}
      >
        stack
      </button>
    </div>
  );
};

export default VolumeChartSwitcher;
