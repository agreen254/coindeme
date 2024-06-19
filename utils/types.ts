import { z } from "zod";

import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import {
  assetSchema,
  assetValidatorSchema,
  assetHistorySchema,
  assetCurrentSchema,
  coinCurrentRequestSchema,
  coinCurrentResponseSchema,
  coinOverviewRequestSchema,
  coinOverviewResponseSchema,
  comparisonChartQueriesSchema,
  comparisonChartRequestSchema,
  comparisonChartResponseSchema,
  currenciesUnionSchema,
  globalResponseUnwrappedSchema,
  coinHistoryRequestSchema,
  coinHistoryResponseSchema,
  globalResponseSchema,
  marketResponseSchema,
  marketResponsePaginatedSchema,
  marketRequest,
  marketElementNoIdxSchema,
  marketElementWithIdxSchema,
  marketFetchFieldSchema,
  marketFetchOrderSchema,
  marketFetchOrderBySchema,
  marketTableModeSchema,
} from "@/validation/schema";

import {
  useAssetCurrentQueries,
  useAssetHistoryQueries,
} from "@/hooks/useAssetQueries";

export type AnalysisDataMode =
  | "price"
  | "rate of return"
  | "volume"
  | "market cap";
export type AnalysisAxis = "left" | "right";
export type AnalysisSeries = {
  axis: AnalysisAxis;
  id: string;
  name: string;
};

export type AssetValidator = z.infer<typeof assetValidatorSchema>;
export type Asset = z.infer<typeof assetSchema>;
export type AssetHistory = z.infer<typeof assetHistorySchema>;
export type AssetCurrent = z.infer<typeof assetCurrentSchema>;

export type Currency = z.infer<typeof currenciesUnionSchema>;

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

export type CoinCurrentRequest = z.infer<typeof coinCurrentRequestSchema>;
export type CoinCurrentResponse = z.infer<typeof coinCurrentResponseSchema>;
export type CoinCurrentQuery = ReturnType<typeof useAssetCurrentQueries>;

export type CoinOverviewRequest = z.infer<typeof coinOverviewRequestSchema>;
export type CoinOverviewResponse = z.infer<typeof coinOverviewResponseSchema>;

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

export type GlobalResponseUnwrapped = z.infer<
  typeof globalResponseUnwrappedSchema
>;
export type GlobalResponse = z.infer<typeof globalResponseSchema>;

export type CoinHistoryRequest = z.infer<typeof coinHistoryRequestSchema>;
export type CoinHistoryResponse = z.infer<typeof coinHistoryResponseSchema>;
export type CoinHistoryQuery = ReturnType<typeof useAssetHistoryQueries>;

export type MarketElementNoIdx = z.infer<typeof marketElementNoIdxSchema>;
export type MarketElementWithIdx = z.infer<typeof marketElementWithIdxSchema>;
export type MarketFetchField = z.infer<typeof marketFetchFieldSchema>;
export type MarketFetchOrderBy = z.infer<typeof marketFetchOrderBySchema>;
export type MarketFetchOrder = z.infer<typeof marketFetchOrderSchema>;
export type MarketTableMode = z.infer<typeof marketTableModeSchema>;
export type MarketResponse = z.infer<typeof marketResponseSchema>;
export type MarketResponsePaginated = z.infer<
  typeof marketResponsePaginatedSchema
>;
export type MarketRequest = z.infer<typeof marketRequest>;

const marketTableSortFields = [
  "name",
  "called_index",
  "current_price",
  "market_cap",
  "total_volume",
  "price_change_percentage_1h_in_currency",
  "price_change_percentage_24h_in_currency",
  "price_change_percentage_7d_in_currency",
] as const;
export type MarketTableSortField = (typeof marketTableSortFields)[number];

export type MarketQueryResult = UseInfiniteQueryResult<
  InfiniteData<MarketResponsePaginated, unknown>,
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

export type SearchParamValidationUnit = {
  schema: z.ZodType;
  key: string;
  fallback: string;
};

export type ThemeType = "light" | "dark";
