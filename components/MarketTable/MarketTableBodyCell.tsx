import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const MarketTableBodyCell = ({ children, className }: Props) => {
  return (
    <td
      className={cn(
        "h-16 py-1 border-y dark:border-neutral-700/60 dark:bg-neutral-800/60",
        className
      )}
    >
      {children}
    </td>
  );
};

export default MarketTableBodyCell;
