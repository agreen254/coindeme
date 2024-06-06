import Link from "next/link";

import {
  MARKET_TABLE_MODE_KEY,
  MARKET_FIELD_KEY,
} from "@/validation/defaults";
import { useMarketParams } from "@/hooks/useMarketParams";

const MarketTableSwapMode = () => {
  const { field, tableMode } = useMarketParams();

  const handleTableMode = () => {
    return {
      pathname: "/",
      query: {
        [MARKET_TABLE_MODE_KEY]:
          tableMode === "infinite" ? "paginated" : "infinite",
        [MARKET_FIELD_KEY]: field,
      },
    };
  };

  return (
    <div className="flex justify-end mb-2">
      <Link
        className="px-3 py-2 mr-4 hover:bg-muted/70 rounded-md text-sm text-primary/70 font-light transition-colors"
        href={handleTableMode()}
        scroll={false}
      >
        Swap View
      </Link>
    </div>
  );
};

export default MarketTableSwapMode;
