import { z } from "zod";
import { lastYear } from "@/utils/dateHelpers";

export const currenciesUnionSchema = z.union([
  z.literal("usd"),
  z.literal("eur"),
  z.literal("gbp"),
  z.literal("btc"),
  z.literal("eth"),
]);

export const currenciesObjectNumberSchema = z.object({
  btc: z.number(),
  eth: z.number(),
  eur: z.number(),
  gbp: z.number(),
  usd: z.number(),
});

const currenciesObjectStringSchema = z.object({
  btc: z.string(),
  eth: z.string(),
  eur: z.string(),
  gbp: z.string(),
  usd: z.string(),
});

export const assetValidatorSchema = z.object({
  coinName: z.string(),
  coinId: z.string().min(1, { message: "No coin selected" }),
  coinImage: z.string(),
  coinSymbol: z.string(),
  date: z
    .date()
    .max(new Date(), { message: "Cannot use future dates" })
    .min(new Date(lastYear()), {
      message: "Date must be less than a year ago",
    }),
  value: z.number().min(1e-15, { message: "No value entered" }),
  valueCurrency: currenciesUnionSchema,
});

export const assetSchema = assetValidatorSchema
  .omit({ date: true })
  .extend({ assetId: z.string(), date: z.string() });

export const assetHistorySchema = z.object({
  assetId: z.string(),
  current_price: currenciesObjectNumberSchema,
  market_cap: currenciesObjectNumberSchema,
  total_volume: currenciesObjectNumberSchema,
});

export const assetCurrentSchema = assetHistorySchema.extend({
  price_change_percentage_24h: z.number(),
  circulating_supply: z.number(),
  total_supply: z.number().nullable(),
  max_supply: z.number().nullable(),
});

export const coinCurrentRequestSchema = z.object({
  assetId: z.string(),
  coinId: z.string(),
});

export const coinCurrentResponseSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.object({
    thumb: z.string(),
    small: z.string(),
  }),
  market_data: z.object({
    current_price: currenciesObjectNumberSchema,
    market_cap: currenciesObjectNumberSchema,
    total_volume: currenciesObjectNumberSchema,
    price_change_percentage_24h: z.number(),
    circulating_supply: z.number(),
    total_supply: z.number().nullable(),
    max_supply: z.number().nullable(),
  }),
});

export const coinHistoryRequestSchema = coinCurrentRequestSchema.extend({
  date: z.string(),
});

export const coinHistoryResponseSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.object({
    thumb: z.string(),
    small: z.string(),
  }),
  market_data: z.object({
    current_price: currenciesObjectNumberSchema,
    market_cap: currenciesObjectNumberSchema,
    total_volume: currenciesObjectNumberSchema,
  }),
});

export const coinOverviewRequestSchema = z.object({
  id: z.string(),
});

export const coinOverviewResponseSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  categories: z.array(z.string()).nullable(),
  description: z.object({
    en: z.string(),
  }),
  links: z.object({
    homepage: z.array(z.string()),
    blockchain_site: z.array(z.string()),
  }),
  image: z.object({
    thumb: z.string(),
    small: z.string(),
    large: z.string(),
  }),
  genesis_date: z.string().nullable(),
  market_data: z.object({
    ath: currenciesObjectNumberSchema,
    ath_change_percentage: currenciesObjectNumberSchema,
    ath_date: currenciesObjectStringSchema,
    atl: currenciesObjectNumberSchema,
    atl_change_percentage: currenciesObjectNumberSchema,
    atl_date: currenciesObjectStringSchema,

    current_price: currenciesObjectNumberSchema,
    fully_diluted_valuation: currenciesObjectNumberSchema.partial(),
    market_cap: currenciesObjectNumberSchema,
    market_cap_rank: z.number(),
    total_volume: currenciesObjectNumberSchema,

    price_change_percentage_24h_in_currency: currenciesObjectNumberSchema,
    price_change_percentage_7d_in_currency: currenciesObjectNumberSchema,
    price_change_percentage_30d_in_currency: currenciesObjectNumberSchema,

    total_supply: z.number().nullable(),
    max_supply: z.number().nullable(),
    circulating_supply: z.number().nullable(),
  }),
  market_cap_rank: z.number(),
});

// each id represents a selected carousel element
export const comparisonChartQueriesSchema = z.object({
  ids: z.string().array(),
  currency: currenciesUnionSchema,
  days: z.string(),
});

// queries are dispatched to the backend individually
export const comparisonChartRequestSchema = comparisonChartQueriesSchema
  .omit({ ids: true })
  .extend({
    id: z.string(),
  });

/**
 * The coingecko API docs specify the following return intervals:
 * 1 day from current time: 5 minute interval
 * 2-90 days from current time: Hourly interval
 * >90 days from current time: Daily interval (00:00 UTC)
 *
 * Each element follows the same format:
 * time (UNIX)
 * value (currency)
 */
export const comparisonChartResponseSchema = z.object({
  prices: z.array(z.array(z.number().nullable()).length(2)),
  market_caps: z.array(z.array(z.number().nullable()).length(2)),
  total_volumes: z.array(z.array(z.number().nullable()).length(2)),
});

export const coinSearchRequestSchema = z.object({
  query: z.string(),
});

export const coinSearchResponseUnitSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  thumb: z.string(),
  large: z.string(),
});

export const coinSearchResponseSchema = z.object({
  coins: z.array(coinSearchResponseUnitSchema),
});

export const globalResponseUnwrappedSchema = z.object({
  active_cryptocurrencies: z.number(),
  markets: z.number(),
  total_market_cap: currenciesObjectNumberSchema,
  total_volume: currenciesObjectNumberSchema,
  market_cap_percentage: z.object({
    btc: z.number(),
    eth: z.number(),
  }),
  market_cap_change_percentage_24h_usd: z.number(),
});

export const globalResponseSchema = z.object({
  data: globalResponseUnwrappedSchema,
});

export const marketFetchFieldSchema = z.union([
  z.literal("market_cap"),
  z.literal("volume"),
]);

export const marketFetchOrderBySchema = z.union([
  z.literal("asc"),
  z.literal("desc"),
]);

export const marketFetchOrderSchema = z.union([
  z.literal("name"),
  z.literal("called_index"),
  z.literal("current_price"),
  z.literal("market_cap"),
  z.literal("total_volume"),
  z.literal("price_change_percentage_1h_in_currency"),
  z.literal("price_change_percentage_24h_in_currency"),
  z.literal("price_change_percentage_7d_in_currency"),
]);

export const marketTableModeSchema = z.union([
  z.literal("infinite"),
  z.literal("paginated"),
]);

export const marketRequest = z.object({
  page: z.number(),
  currency: currenciesUnionSchema,
  fetchParam: marketFetchFieldSchema,
  fetchOrder: z.union([z.literal("asc"), z.literal("desc")]),
});

export const marketElementNoIdxSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),

  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number().nullable(),
  fully_diluted_valuation: z.number().nullable(),
  total_volume: z.number(),
  high_24h: z.number(),
  low_24h: z.number(),
  price_change_24h: z.number(),
  price_change_percentage_24h: z.number(),
  market_cap_change_24h: z.number(),
  market_cap_change_percentage_24h: z.number(),
  circulating_supply: z.number(),
  total_supply: z.number().nullable(),
  max_supply: z.number().nullable(),

  ath: z.number(),
  ath_change_percentage: z.number(),
  ath_date: z.string(),
  atl: z.number(),
  atl_change_percentage: z.number(),
  atl_date: z.string(),
  roi: z
    .object({
      times: z.number(),
      currency: z.string(),
      percentage: z.number(),
    })
    .nullable(),
  last_updated: z.string(),

  sparkline_in_7d: z.object({
    price: z.number().array(),
  }),
  price_change_percentage_1h_in_currency: z.number().nullable(),
  price_change_percentage_24h_in_currency: z.number().nullable(),
  price_change_percentage_7d_in_currency: z.number().nullable(),
});

export const marketElementWithIdxSchema = marketElementNoIdxSchema.extend({
  called_index: z.number(),
});

export const marketResponseSchema = z.array(marketElementNoIdxSchema);
export const marketResponsePaginatedSchema = z.object({
  market: marketResponseSchema,
  nextPage: z.number(),
});
