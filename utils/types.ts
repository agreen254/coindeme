import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import {
  marketSchema,
  marketResponseSchema,
  marketRequest,
  marketEleNoIdxSchema,
  marketEleWithIdxSchema,
  marketFetchParamSchema,
} from "@/validation/schema";
import { z } from "zod";

const validCurrencies = ["usd", "eur", "gbp", "btc", "eth"] as const;
export type Currency = (typeof validCurrencies)[number];

export type Market = z.infer<typeof marketSchema>;
export type MarketEleNoIdx = z.infer<typeof marketEleNoIdxSchema>;
export type MarketEleWithIdx = z.infer<typeof marketEleWithIdxSchema>;
export type MarketFetchParam = z.infer<typeof marketFetchParamSchema>;
export type MarketTableMode = "infinite" | "paginated";
export type MarketResponse = z.infer<typeof marketResponseSchema>;
export type MarketRequest = z.infer<typeof marketRequest>;

const marketTableSortFields = [
  "name",
  "called_index",
  "current_price",
  "market_cap",
  "price_change_percentage_1h_in_currency",
  "price_change_percentage_24h_in_currency",
  "price_change_percentage_7d_in_currency",
] as const;
export type MarketTableSortField = (typeof marketTableSortFields)[number];

export type MarketQueryResult = UseInfiniteQueryResult<
  InfiniteData<MarketResponse, unknown>,
  Error
>;
