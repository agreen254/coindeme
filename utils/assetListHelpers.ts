import type {
  Asset,
  CoinCurrentQueryUnit,
  CoinHistoryQueryUnit,
  Currency,
} from "./types";

type Result = {
  circVsMaxSupply: number | null;
  currentPrice: number;
  currentPriceChange24h: number;
  currentValue: number;
  currentValueChangePercent: number;
  marketCapVsVolume: number;
};

export function getAssetDisplayData(
  asset: Asset,
  currency: Currency,
  cData: CoinCurrentQueryUnit,
  hData: CoinHistoryQueryUnit
): Result {
  // make sure we use the currency the user-submitted value here
  const numCoins = asset.value / hData.current_price[asset.valueCurrency];

  const currentPrice = cData.current_price[currency];
  const currentPriceChange24h = cData.price_change_percentage_24h;

  const currentValue = numCoins * cData.current_price[currency];
  const currentValueChangePercent =
    ((currentValue - asset.value) * 100) / asset.value;

  const circVsMaxSupply = cData.max_supply
    ? cData.circulating_supply / cData.max_supply
    : null;
  const marketCapVsVolume =
    cData.market_cap[currency] / cData.total_volume[currency];

  return {
    circVsMaxSupply,
    currentPrice,
    currentValue,
    marketCapVsVolume,
    currentPriceChange24h,
    currentValueChangePercent,
  };
}
