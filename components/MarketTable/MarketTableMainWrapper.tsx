"use client";

import type { MarketQueryResult } from "@/utils/types";

import { useMarketTableMode } from "@/hooks/useMarketTable";

import { ErrorBoundary } from "react-error-boundary";
import MarketTableInfiniteWrapper from "./MarketTableInfiniteWrapper";
import MarketTablePaginatedWrapper from "./MarketTablePaginatedWrapper";
import MarketTableSwapMode from "./MarketTableSwapMode";

type Props = {
  queryResult: MarketQueryResult;
};

const MarketTableMainWrapper = ({ queryResult }: Props) => {
  const tableMode = useMarketTableMode();

  return (
    <div>
      <ErrorBoundary
        fallback={
          <h2 className="text-center text-2xl text-destructive">
            Failed to render market data.
          </h2>
        }
      >
        <MarketTableSwapMode />
        {tableMode === "paginated" ? (
          <MarketTablePaginatedWrapper queryResult={queryResult} />
        ) : (
          <MarketTableInfiniteWrapper queryResult={queryResult} />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default MarketTableMainWrapper;
