import { MarketElementNoIdx } from "./types";

export function convertCoinAmount(
  amount: number,
  fromData: MarketElementNoIdx | undefined,
  toData: MarketElementNoIdx | undefined
) {
  if (!fromData || !toData) return amount;
  return (fromData.current_price * amount) / toData.current_price;
}
