import { useSearchParams } from "next/navigation";
import { URLSearchParams } from "url";

import {
  DEFAULT_MARKET_FIELD,
  DEFAULT_MARKET_ORDER_BY,
} from "@/validation/defaults";

import {
  marketFetchFieldSchema,
  marketFetchOrderBySchema,
} from "@/validation/schema";

export function handleField(params: URLSearchParams) {
  const field = params.get("field");
  const fieldValidation = marketFetchFieldSchema.safeParse(field);
  return fieldValidation.success ? fieldValidation.data : DEFAULT_MARKET_FIELD;
}

export function handleOrder(params: URLSearchParams) {
  const order = params.get("order");
  const orderValidation = marketFetchOrderBySchema.safeParse(order);
  return orderValidation.success
    ? orderValidation.data
    : DEFAULT_MARKET_ORDER_BY;
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
