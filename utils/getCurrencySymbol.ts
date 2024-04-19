import type { Currency } from "./types";

import { currencyMap } from "./maps";

export function getCurrencySymbol(currency: Currency) {
  return currencyMap.get(currency)!;
}
