import type { Market, MarketRequest, MarketResponse } from "@/utils/types";

import { marketRequest, marketSchema } from "@/validation/schema";
import { NextRequest } from "next/server";
import { postValidationHandler } from "@/utils/fetchValidationHandlers";

export async function POST(req: NextRequest) {
  const urlExtractor = (body: MarketRequest) => {
    const { page, currency, fetchParam, fetchOrder } = body;

    const fetchHead = "https://api.coingecko.com/api/v3/coins/markets";
    const fetchBody = `?vs_currency=${currency}&order=${fetchParam}_${fetchOrder}&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2c24h%2c7d`;
    const fetchTail = `&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;
    return [fetchHead, fetchBody, fetchTail].join("");
  };

  // make sure the information for the next page is contained in the response
  const responseTransfomer = (
    body: MarketRequest,
    response: Market
  ): MarketResponse => {
    return {
      market: response,
      nextPage: body.page + 1,
    };
  };

  return postValidationHandler<MarketRequest, Market, MarketResponse>(
    req,
    marketRequest,
    marketSchema,
    urlExtractor,
    responseTransfomer
  );
}
