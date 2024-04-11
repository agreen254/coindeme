import type {
  AssetHistory,
  CoinHistoryRequest,
  CoinHistoryResponse,
} from "@/utils/types";

import { composeFetchUrl } from "@/utils/composeFetchUrl";
import {
  coinHistoryRequestSchema,
  coinHistoryResponseSchema,
} from "@/validation/schema";
import { NextRequest } from "next/server";
import { postValidationHandler } from "@/validation/handler";

export async function POST(req: NextRequest) {
  function urlExtractor(body: CoinHistoryRequest) {
    const { coinId, date } = body;
    return composeFetchUrl({
      head: "    https://api.coingecko.com/api/v3/coins               ",
      body: `    /${coinId}/history?date=${date}                      `,
      tail: `    &x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}  `,
    });
  }

  function responseTransformer(
    body: CoinHistoryRequest,
    response: CoinHistoryResponse
  ): AssetHistory {
    return {
      assetId: body.assetId,
      current_price: response.market_data.current_price,
      market_cap: response.market_data.market_cap,
      total_volume: response.market_data.total_volume,
    };
  }

  return postValidationHandler<
    CoinHistoryRequest,
    CoinHistoryResponse,
    AssetHistory
  >(
    req,
    coinHistoryRequestSchema,
    coinHistoryResponseSchema,
    urlExtractor,
    responseTransformer
  );
}
