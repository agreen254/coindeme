import { useSearchParams } from "next/navigation";
import { URLSearchParams } from "url";

import {
  marketFetchFieldSchema,
  marketFetchOrderSchema,
} from "@/validation/schema";
import { MarketFetchOrder, MarketFetchField } from "@/utils/types";

export const DEFAULT_MARKET_FIELD: MarketFetchField = "market_cap";
export const DEFAULT_MARKET_ORDER: MarketFetchOrder = "desc";

export function handleField(params: URLSearchParams) {
  const field = params.get("field");
  const fieldValidation = marketFetchFieldSchema.safeParse(field);
  return fieldValidation.success ? fieldValidation.data : DEFAULT_MARKET_FIELD;
}

export function handleOrder(params: URLSearchParams) {
  const order = params.get("order");
  const orderValidation = marketFetchOrderSchema.safeParse(order);
  return orderValidation.success ? orderValidation.data : DEFAULT_MARKET_ORDER;
}

/**
 * The middleware should be handling all edge cases here,
 * but the typescript compiler will still complain.
 *
 * So, the validation is repeated here.
 */
export function useMarketParams() {
  const params = useSearchParams();

  return {
    field: handleField(params),
    order: handleOrder(params),
  };
}
