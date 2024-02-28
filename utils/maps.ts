import { MarketFetchParam, type Currency } from "./types";

export const comparisonChartsTimeSelectorsMap = new Map<string, string>([
  ["1D", "1"],
  ["7D", "7"],
  ["14D", "14"],
  ["1M", "31"],
  ["6M", "180"],
  ["1Y", "365"],
  ["MAX", "max"],
]);

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
