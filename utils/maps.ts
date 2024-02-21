import { MarketFetchParam, type Currency } from "./types";

export const currencyMap = new Map<Currency, string>([
  ["usd", "$"],
  ["eur", "€"],
  ["gbp", "£"],
  ["btc", "฿"],
  ["eth", "Ξ"],
]);

export const marketFetchParamMap = new Map<MarketFetchParam, string>([
  ["market_cap", "market cap"],
  ["volume", "volume"],
]);
