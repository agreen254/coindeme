"use client";

import { useMarketTableMode } from "@/hooks/useMarketTable";
import { useMarketQuery } from "@/hooks/useMarketQuery";

import { ErrorBoundary } from "react-error-boundary";
import MarketTableInfiniteWrapper from "./MarketTableInfiniteWrapper";
import MarketTablePaginatedWrapper from "./MarketTablePaginatedWrapper";

const MarketTableMainWrapper = () => {
  const tableMode = useMarketTableMode();

  // TODO: get the three fields below from url search params
  const currency = "usd";
  const marketFetchParam = "market_cap";
  const marketFetchOrder = "desc";

  const queryResult = useMarketQuery(
    currency,
    marketFetchParam,
    marketFetchOrder
  );

  return (
    <div>
      <ErrorBoundary
        fallback={
          <h2 className="text-center text-2xl text-destructive">
            Failed to render market data.
          </h2>
        }
      >
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
