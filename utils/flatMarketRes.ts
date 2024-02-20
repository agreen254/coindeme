import type { MarketResponse } from "./types";

/**
 * Removes the pagination information from the InfiniteQueryResponse,
 * transforming the input to a 1-Dimensional array of only table rows to map over.
 */
export function flatMarketRes(res: MarketResponse[] | undefined) {
  return res?.map((ele) => ele.market).flat();
}
