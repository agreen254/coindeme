import type {
  Currency,
  MarketRequest,
  MarketFetchField,
  MarketFetchOrder,
  MarketResponsePaginated,
} from "@/utils/types";

import { useInfiniteQuery } from "@tanstack/react-query";

export const useMarketQuery = (
  currency: Currency,
  fetchParam: MarketFetchField,
  fetchOrder: MarketFetchOrder,
) => {
  return useInfiniteQuery({
    // do not retry because this will spam api requests if the first is not successful
    retry: false,

    // unique keys will create independent caches so unrelated data is not mixed together
    queryKey: ["market", currency, fetchParam, fetchOrder],

    // all pages are refetched to avoid updates that can cause duplication issues
    // we want a large stale time so api request are more spaced out
    staleTime: 300 * 1000,

    queryFn: async ({ pageParam }): Promise<MarketResponsePaginated> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/table`,
        {
          method: "POST",
          body: JSON.stringify(<MarketRequest>{
            page: pageParam,
            currency: currency,
            fetchParam: fetchParam,
            fetchOrder: fetchOrder,
          }),
        }
      );

      // https://tanstack.com/query/latest/docs/framework/react/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }
      return await response.json();
    },
    meta: {
      errorMessage: "Failed to fetch market data:",
    },
    initialPageParam: 1,
    getNextPageParam: (prev) => prev.nextPage,
  });
};
