import { ForwardedRef, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface PanelProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const Panel = (
  { children, className, ...props }: PanelProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-zinc-50 shadow-sm dark:shadow-none dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default forwardRef(Panel);
