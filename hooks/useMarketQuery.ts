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

    queryFn: async ({ pageParam }): Promise<MarketResponse> =>
      await fetch("http://localhost:3000/api/v1/table", {
        method: "POST",
        body: JSON.stringify(<MarketRequest>{
          page: pageParam,
          currency: currency,
          fetchParam: fetchParam,
          fetchOrder: fetchOrder,
        }),
      }).then((res) => res.json()),
    initialPageParam: 1,
    getNextPageParam: (prev) => prev.nextPage,
  });
};
