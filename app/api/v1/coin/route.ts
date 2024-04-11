import type { CoinRequest, CoinResponse } from "@/utils/types";

import { NextRequest } from "next/server";
import { coinRequestSchema, coinResponseSchema } from "@/validation/schema";
import { composeFetchUrl } from "@/utils/composeFetchUrl";
import { postValidationHandler } from "@/validation/handler";

export async function POST(req: NextRequest) {
  function urlExtractor(body: CoinRequest) {
    const { id } = body;
    return composeFetchUrl({
      head: "    https://api.coingecko.com/api/v3/coins               ",
      body: `    /${id}?community_data=false&developer_data=false     `,
      tail: `    &x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}  `,
    });
  }

  return postValidationHandler<CoinRequest, CoinResponse>(
    req,
    coinRequestSchema,
    coinResponseSchema,
    urlExtractor
  );
}
