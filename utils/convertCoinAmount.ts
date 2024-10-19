import { CoinOverviewResponse, Currency } from "./types";

export function convertCoinAmount(
  amount: number,
  currency: Currency,
  fromData: CoinOverviewResponse | undefined,
  toData: CoinOverviewResponse | undefined
) {
  if (!fromData || !toData) return amount;
  return (
    (fromData.market_data.current_price[currency] * amount) /
    toData.market_data.current_price[currency]
  );
}
