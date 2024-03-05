import type {
  Currency,
  MarketRequest,
  MarketFetchParam,
  MarketResponse,
} from "@/utils/types";

import { useInfiniteQuery } from "@tanstack/react-query";

export const useMarketQuery = (
  currency: Currency,
  fetchParam: MarketFetchParam,
  fetchOrder: "asc" | "desc"
) => {
  return useInfiniteQuery({
    // unique keys will create independent caches so unrelated data is not mixed together
    queryKey: ["market", fetchParam, fetchOrder],

    // all pages are refetched to avoid updates that can cause duplication issues
    staleTime: 300 * 1000,

    /**
     * Have to manually throw an error if the response is not okay since
     * the fetch API does not do so for unsuccessfull HTTP calls.
     */
    queryFn: async ({ pageParam }): Promise<MarketResponse> => {
      const response = await fetch("http://localhost:3000/api/v1/table", {
        method: "POST",
        body: JSON.stringify(<MarketRequest>{
          page: pageParam,
          currency: currency,
          fetchParam: fetchParam,
          fetchOrder: fetchOrder,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.message);
      }
      return await response.json();
    },
    meta: {
      errorMessage: "Failed to fetch market data.",
    },
    initialPageParam: 1,
    getNextPageParam: (prev) => prev.nextPage,
  });
};
