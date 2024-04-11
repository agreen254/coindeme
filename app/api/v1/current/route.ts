import type {
  AssetCurrent,
  CoinCurrentRequest,
  CoinCurrentResponse,
} from "@/utils/types";

import {
  coinCurrentRequestSchema,
  coinCurrentResponseSchema,
} from "@/validation/schema";
import { composeFetchUrl } from "@/utils/composeFetchUrl";
import { NextRequest } from "next/server";
import { postValidationHandler } from "@/validation/handler";

export async function POST(req: NextRequest) {
  function urlExtractor(body: CoinCurrentRequest) {
    const { coinId } = body;
    return composeFetchUrl({
      head: "   https://api.coingecko.com/api/v3/coins                 ",
      body: `   /${coinId}?community_data=false&developer_data=false   `,
      tail: `   &x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}    `,
    });
  }

  // do not keep unused data from the response
  function responseTransformer(
    body: CoinCurrentRequest,
    response: CoinCurrentResponse
  ): AssetCurrent {
    return {
      assetId: body.assetId,
      current_price: response.market_data.current_price,
      market_cap: response.market_data.market_cap,
      total_volume: response.market_data.total_volume,
      price_change_percentage_24h:
        response.market_data.price_change_percentage_24h,
      circulating_supply: response.market_data.circulating_supply,
      max_supply: response.market_data.max_supply,
      total_supply: response.market_data.total_supply,
    };
  }

  return postValidationHandler<
    CoinCurrentRequest,
    CoinCurrentResponse,
    AssetCurrent
  >(
    req,
    coinCurrentRequestSchema,
    coinCurrentResponseSchema,
    urlExtractor,
    responseTransformer
  );
}
