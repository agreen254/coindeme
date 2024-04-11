import type { Asset } from "./types";

import { useAssetQueries } from "@/hooks/useAssetQueries";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { flatMarketRes } from "./flatMarketRes";

type Props = {
  historyResponse: ReturnType<typeof useAssetQueries>[number];
  marketResponse: ReturnType<typeof useMarketQuery>;
  asset: Asset;
};

type Result = {
  currentAssetChangePercent: string;
  currentAssetValue: string;
  currentCoinPrice: string;
  twentyFourPercent: string;
  marketCapVsVolume: string;
  circulatingVsMaxSupply: string;
};

export function getAssetDisplays({
  asset,
  historyResponse,
  marketResponse,
}: Props): Result {
  const numCoins = historyResponse.data
    ? asset.value / historyResponse.data.current_price.usd
    : null;
  const currentAssetStats = flatMarketRes(marketResponse.data?.pages)?.find(
    (coin) => coin.id === asset.coinId
  );

  const currentAssetValue =
    numCoins && currentAssetStats
      ? (numCoins * currentAssetStats.current_price).toString()
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
    ? currentAssetStats.current_price.toString()
    : "-";
  const marketCapVsVolume = currentAssetStats
    ? (currentAssetStats.market_cap / currentAssetStats.total_volume).toString()
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
