import type { MarketEleNoIdx, MarketEleWithIdx } from "./types";

/**
 * Incorporate the originally fetched index into the data rendered by the table.
 *
 * Consider: if I fetch the top 50 coins by market cap Bitcoin will (most likely)
 * be at the #1 spot on top of the table.
 * If I then sort the data by name Bitcoin will no longer be at the very top, but I would still like
 * to know that it has the highest market cap.
 * This method allows for the index shown to the left of the name to still be preserved as #1.
 * The added property is displayed in the '#' column of the table.
 */
export function addMarketIndices(data: MarketEleNoIdx[]) {
  return data.reduce((extended: MarketEleWithIdx[], ele, idx) => {
    const extendedEle = { ...ele, called_index: idx };
    return [...extended, extendedEle];
  }, []);
}
