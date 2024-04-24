import type { CoinOverviewRequest, CoinOverviewResponse } from "@/utils/types";

import { NextRequest } from "next/server";

import {
  coinOverviewRequestSchema,
  coinOverviewResponseSchema,
} from "@/validation/schema";
import { composeFetchUrl } from "@/utils/composeFetchUrl";
import { postValidationHandler } from "@/validation/handler";

export async function POST(req: NextRequest) {
  function urlExtractor(body: CoinOverviewRequest) {
    const { id } = body;

    return composeFetchUrl({
      head: "   https://api.coingecko.com/api/v3/coins                                                                              ",
      body: `   /${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false   `,
      tail: `   &x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}                                                                 `,
    });
  }

  return postValidationHandler<CoinOverviewRequest, CoinOverviewResponse>(
    req,
    coinOverviewRequestSchema,
    coinOverviewResponseSchema,
    urlExtractor
  );
}
