import type {
  AssetHistory,
  HistoryRequest,
  HistoryResponse,
} from "@/utils/types";

import { composeFetchUrl } from "@/utils/composeFetchUrl";
import {
  historyRequestSchema,
  historyResponseSchema,
} from "@/validation/schema";
import { NextRequest } from "next/server";
import { postValidationHandler } from "@/validation/handler";

export async function POST(req: NextRequest) {
  function urlExtractor(body: HistoryRequest) {
    const { coinId, date } = body;
    return composeFetchUrl({
      head: "     https://api.coingecko.com/api/v3/coins               ",
      body: `     /${coinId}/history?date=${date}                      `,
      tail: `     &x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}  `,
    });
  }

  function responseTransformer(
    body: HistoryRequest,
    response: HistoryResponse
  ): AssetHistory {
    return {
      ...response,
      assetId: body.assetId,
      lastUpdated: body.date,
    };
  }

  return postValidationHandler<HistoryRequest, HistoryResponse>(
    req,
    historyRequestSchema,
    historyResponseSchema,
    urlExtractor,
    responseTransformer
  );
}
