import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const MarketTableHeaderCell = ({ children, className }: Props) => {
  return (
    <th
      scope="col"
      className={cn(
        "py-4 text-start text-sm border-b font-light tracking-wider dark:text-primary/80 dark:border-zinc-900/70 dark:bg-zinc-900/70",
        className
      )}
    >
      {children}
    </th>
  );
};

export default MarketTableHeaderCell;
