import { z } from "zod";

export const validCurrenciesSchema = z.union([
  z.literal("usd"),
  z.literal("eur"),
  z.literal("gbp"),
  z.literal("btc"),
  z.literal("eth"),
]);

export const marketFetchParamSchema = z.union([
  z.literal("market_cap"),
  z.literal("volume"),
]);

export const marketRequest = z.object({
  page: z.number(),
  currency: validCurrenciesSchema,
  fetchParam: marketFetchParamSchema,
  fetchOrder: z.union([z.literal("asc"), z.literal("desc")]),
});

export const marketEleNoIdxSchema = z.object({
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

export const marketEleWithIdxSchema = marketEleNoIdxSchema.extend({
  called_index: z.number(),
});

export const marketSchema = z.array(marketEleNoIdxSchema);
export const marketResponseSchema = z.object({
  market: marketSchema,
  nextPage: z.number(),
});
