import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import {
  assetSchema,
  assetValidatorSchema,
  assetHistorySchema,
  coinRequestSchema,
  coinResponseSchema,
  comparisonChartQueriesSchema,
  comparisonChartRequestSchema,
  comparisonChartResponseSchema,
  globalResponseSchema,
  historyRequestSchema,
  historyResponseSchema,
  globalResponseWrappedSchema,
  marketSchema,
  marketResponseSchema,
  marketRequest,
  marketElementNoIdxSchema,
  marketElementWithIdxSchema,
  marketFetchParamSchema,
} from "@/validation/schema";
import { z } from "zod";

export type AssetValidator = z.infer<typeof assetValidatorSchema>;
export type Asset = z.infer<typeof assetSchema>;
export type AssetHistory = z.infer<typeof assetHistorySchema>;

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

export type CoinRequest = z.infer<typeof coinRequestSchema>;
export type CoinResponse = z.infer<typeof coinResponseSchema>;

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

export type GlobalResponse = z.infer<typeof globalResponseSchema>;
export type GlobalResponseWrapped = z.infer<typeof globalResponseWrappedSchema>;

export type HistoryRequest = z.infer<typeof historyRequestSchema>;
export type HistoryResponse = z.infer<typeof historyResponseSchema>;

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

export type OverlappedVolumeData = {
  name: string;
  volume: number;
};

export type SearchTargets = {
  name: string;
  symbol: string;
  id: string;
}[];

export type SearchResultWrapper = {
  result: Fuzzysort.Result;
  otherText: string; // store the name if the symbol is matched and vice-versa
  kind: string;
  id: string;
};
