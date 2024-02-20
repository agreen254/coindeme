import { padTwoDecimals, roundDigits } from "@/utils/formatHelpers";

import CaretIcon from "../../Icons/Caret";

const MarketTablePriceChange = ({ change }: { change: number | null }) => {
  const formattedChange = (n: number) =>
    padTwoDecimals(roundDigits(n, 2).toString());

  if (!change)
    return <span className="text-xs text-muted-foreground">N/A</span>;
  return change < 0 ? (
    <span className="text-market-down font-mono">
      <CaretIcon className="w-3 h-3 mr-1 rotate-180 inline fill-market-down" />
      {formattedChange(change)}%
    </span>
  ) : (
    <span className="text-market-up font-mono">
      <CaretIcon className="w-3 h-3 mr-1 inline fill-market-up" />
      {formattedChange(change)}%
    </span>
  );
};

export default MarketTablePriceChange;
