import { MarketQueryResult } from "./types";

export function getNumMarketRecords(data: MarketQueryResult["data"]) {
  if (!data) return 0;

  return data.pages.reduce((recordCount, page) => {
    return recordCount + page.market.length;
  }, 0);
}
