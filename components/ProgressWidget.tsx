import { cn } from "@/utils/cn";

type Props = {
  containerClassName?: string;
  progressClassName?: string;
  progressPercentage: number;
};

const ProgressWidget = ({
  containerClassName,
  progressClassName,
  progressPercentage,
}: Props) => {
  return (
    <div className={cn("h-[6px] rounded-[2px]", containerClassName)}>
      <div
        className={cn("h-full rounded-[2px]", progressClassName)}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressWidget;
