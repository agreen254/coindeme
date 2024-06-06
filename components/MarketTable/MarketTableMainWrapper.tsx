"use client";

import { ErrorBoundary } from "react-error-boundary";

import type { MarketQueryResult } from "@/utils/types";
import { useMarketParams } from "@/hooks/useMarketParams";

import MarketTableInfiniteWrapper from "./MarketTableInfiniteWrapper";
import MarketTablePaginatedWrapper from "./MarketTablePaginatedWrapper";
import MarketTableSwapMode from "./MarketTableSwapMode";

type Props = {
  queryResult: MarketQueryResult;
};

const MarketTableMainWrapper = ({ queryResult }: Props) => {
  const { tableMode } = useMarketParams();

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
