import { MarketFetchField, ScreenSize, type Currency } from "./types";

export const comparisonChartsTimeSelectorsMap = new Map<string, string>([
  ["1D", "1"],
  ["7D", "7"],
  ["14D", "14"],
  ["1M", "31"],
  ["6M", "180"],
  ["1Y", "365"],
]);

export const reverseTimeSelectorsMap = new Map<string, string>([
  ["1", "1D"],
  ["7", "7D"],
  ["14", "14D"],
  ["31", "1M"],
  ["180", "6M"],
  ["365", "1Y"],
]);

export const currencyMap = new Map<Currency, string>([
  ["usd", "$"],
  ["eur", "€"],
  ["gbp", "£"],
  ["btc", "฿"],
  ["eth", "Ξ"],
]);
export const currencyEntries = Array.from(currencyMap.entries());

export const marketFetchParamMap = new Map<MarketFetchField, string>([
  ["market_cap", "market cap"],
  ["volume", "volume"],
]);

export const chartTitleFontSizeMap = new Map<ScreenSize, number>([
  ["XS", 14],
  ["SM", 16],
  ["MD", 20],
  ["LG", 22],
  ["XL", 24],
]);

export const chartTooltipFontSizeMap = new Map<ScreenSize, number>([
  ["XS", 8],
  ["SM", 10],
  ["MD", 14],
  ["LG", 16],
  ["XL", 18],
]);

export const chartTooltipPaddingSizeMap = new Map<ScreenSize, number>([
  ["XS", 6],
  ["SM", 8],
  ["MD", 12],
  ["LG", 14],
  ["XL", 16],
]);

export const chartTickFontSizeMap = new Map<ScreenSize, number>([
  ["XS", 8],
  ["SM", 10],
  ["MD", 12],
  ["LG", 12],
  ["XL", 14],
]);

export const chartLineThicknessMap = new Map<ScreenSize, number>([
  ["XS", 1],
  ["SM", 1.25],
  ["MD", 1.5],
  ["LG", 1.75],
  ["XL", 2],
]);
