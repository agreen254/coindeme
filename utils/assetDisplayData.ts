import type {
  Asset,
  AssetCurrent,
  AssetHistory,
  Currency,
} from "./types";

type Result = {
  circVsTotalSupply: number | null;
  currentPrice: number;
  currentPriceChange24h: number;
  currentValue: number;
  currentValueChangePercent: number;
  marketCapVsVolume: number;
};

export function assetDisplayData(
  asset: Asset,
  currency: Currency,
  cData: AssetCurrent,
  hData: AssetHistory
): Result {
  // make sure we use the same currency that the user submitted here
  // the initial value is only referring to that specific currency
  const numCoins = asset.value / hData.current_price[asset.valueCurrency];

  const currentPrice = cData.current_price[currency];
  const currentPriceChange24h = cData.price_change_percentage_24h;

  const currentValue = numCoins * cData.current_price[currency];
  const currentValueChangePercent =
    ((currentValue - asset.value) * 100) / asset.value;

  const circVsTotalSupply = cData.total_supply
    ? (cData.circulating_supply * 100) / cData.total_supply
    : null;
  const marketCapVsVolume =
    cData.market_cap[currency] / cData.total_volume[currency];

  return {
    circVsTotalSupply,
    currentPrice,
    currentValue,
    marketCapVsVolume,
    currentPriceChange24h,
    currentValueChangePercent,
  };
}
