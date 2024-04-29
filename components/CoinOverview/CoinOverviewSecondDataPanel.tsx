import { useCoinQuery } from "@/hooks/useCoinQuery";
import { cn } from "@/utils/cn";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const CoinOverviewSecondDataPanel = ({ response }: Props) => {
  return (
    <div
      className={cn(
        "w-full h-[400px] rounded-xl bg-zinc-900/70 border border-zinc-800",
        response.isPending && "animate-pulse"
      )}
    >
      Placeholder
    </div>
  );
};

export default CoinOverviewSecondDataPanel;
