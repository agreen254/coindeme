import { formatPriceChange } from "@/utils/formatHelpers";

import CaretIcon from "../Icons/Caret";

const PricePercentageChange = ({ change }: { change: number | null }) => {
  if (!change)
    return <span className="text-xs text-muted-foreground">N/A</span>;
  return change < 0 ? (
    <span className="text-market-down">
      <CaretIcon className="w-3 h-3 mr-1 rotate-180 inline fill-market-down" />
      {formatPriceChange(change)}%
    </span>
  ) : (
    <span className="text-market-up">
      <CaretIcon className="w-3 h-3 mr-1 inline fill-market-up" />
      {formatPriceChange(change)}%
    </span>
  );
};

export default PricePercentageChange;
