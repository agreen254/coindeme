import type {
  ComparisonChartRequest,
  ComparisonChartResponse,
} from "@/utils/types";

import {
  comparisonChartRequestSchema,
  comparisonChartResponseSchema,
} from "@/validation/schema";
import { composeFetchUrl } from "@/utils/composeFetchUrl";
import { postValidationHandler } from "@/validation/handler";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  function urlExtractor(body: ComparisonChartRequest) {
    const { id, currency, days } = body;

    return composeFetchUrl({
      head: "   https://api.coingecko.com/api/v3/coins                     ",
      body: `   /${id}/market_chart?vs_currency=${currency}&days=${days}   `,
      tail: `   &x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}        `,
    });
  }

  return postValidationHandler<ComparisonChartRequest, ComparisonChartResponse>(
    req,
    comparisonChartRequestSchema,
    comparisonChartResponseSchema,
    urlExtractor
  );
}
