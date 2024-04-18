import type { MarketResponsePaginated } from "./types";

/**
 * Removes the pagination information from the InfiniteQueryResponse,
 * transforming the input to a 1-Dimensional array of only table rows to map over.
 * 
 * change this to work on the entire response object...
 */
export function flatMarketRes(res: MarketResponsePaginated[] | undefined) {
  return res?.map((ele) => ele.market).flat();
}
