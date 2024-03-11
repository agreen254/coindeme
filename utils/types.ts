import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import {
  comparisonChartQueriesSchema,
  comparisonChartRequestSchema,
  comparisonChartResponseSchema,
  marketSchema,
  marketResponseSchema,
  marketRequest,
  marketElementNoIdxSchema,
  marketElementWithIdxSchema,
  marketFetchParamSchema,
} from "@/validation/schema";
import { z } from "zod";

const validCurrencies = ["usd", "eur", "gbp", "btc", "eth"] as const;
export type Currency = (typeof validCurrencies)[number];

export type Dataset = {
  x: number[];
  y: number[];
};

type Color = {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
};

export type ChartColorSet = {
  highlightColor: Color;
  startColor: Color;
  endColor: Color;
};

export type ComparisonChartQueries = z.infer<
  typeof comparisonChartQueriesSchema
>;
export type ComparisonChartRequest = z.infer<
  typeof comparisonChartRequestSchema
>;
export type ComparisonChartResponse = z.infer<
  typeof comparisonChartResponseSchema
>;
export type ComparisonData = {
  label: number[];
  values: number[][];
};

export type Market = z.infer<typeof marketSchema>;
export type MarketElementNoIdx = z.infer<typeof marketElementNoIdxSchema>;
export type MarketElementWithIdx = z.infer<typeof marketElementWithIdxSchema>;
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
