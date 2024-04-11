import type { Asset, Currency } from "./types";

import {
  useAssetCurrentQueries,
  useAssetHistoryQueries,
} from "@/hooks/useAssetQueries";

type Props = {
  asset: Asset;
  currency: Currency;
  currentResponse: ReturnType<typeof useAssetCurrentQueries>[number];
  historyResponse: ReturnType<typeof useAssetHistoryQueries>[number];
};

type Result = {
  circulatingVsMaxSupply: string;
  currentAssetChangePercent: string;
  currentAssetValue: string;
  currentCoinPrice: string;
  marketCapVsVolume: string;
  twentyFourPercent: string;
};

export function getAssetDisplays({
  asset,
  currency = "usd",
  currentResponse,
  historyResponse,
}: Props): Result {
  function getNumCoins() {
    if (!historyResponse.data) return null;
    return asset.value / historyResponse.data?.current_price[currency];
  }
  const numCoins = getNumCoins();
  const currentAssetStats = currentResponse.data;

  const currentAssetValue =
    numCoins && currentAssetStats
      ? (numCoins * currentAssetStats.current_price[currency]).toString()
      : "-";
  const currentAssetChangePercent =
    currentAssetValue !== "-"
      ? (
          ((parseFloat(currentAssetValue) - asset.value) * 100) /
          asset.value
        ).toString() + "%"
      : "";

  const twentyFourPercent = currentAssetStats
    ? currentAssetStats.price_change_percentage_24h.toString() + "%"
    : "-";

  const currentCoinPrice = currentAssetStats
    ? currentAssetStats.current_price[currency].toString()
    : "-";
  const marketCapVsVolume = currentAssetStats
    ? (
        currentAssetStats.market_cap[currency] /
        currentAssetStats.total_volume[currency]
      ).toString()
    : "-";
  const circulatingVsMaxSupply =
    currentAssetStats && currentAssetStats.max_supply
      ? (
          currentAssetStats.circulating_supply / currentAssetStats.max_supply
        ).toString()
      : "-";

  return {
    currentAssetChangePercent,
    currentAssetValue,
    currentCoinPrice,
    twentyFourPercent,
    marketCapVsVolume,
    circulatingVsMaxSupply,
  };
}
