import type { Market, MarketRequest, MarketResponse } from "@/utils/types";

import { composeFetchUrl } from "@/utils/composeFetchUrl";
import { marketRequest, marketSchema } from "@/validation/schema";
import { NextRequest } from "next/server";
import { postValidationHandler } from "@/validation/handler";

export async function POST(req: NextRequest) {
  function urlExtractor(body: MarketRequest) {
    const { page, currency, fetchParam, fetchOrder } = body;

    return composeFetchUrl({
      head: "   https://api.coingecko.com/api/v3/coins/markets                                                                                             ",
      body: `   ?vs_currency=${currency}&order=${fetchParam}_${fetchOrder}&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2c24h%2c7d   `,
      tail: `   &x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}                                                                                        `,
    });
  }

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
