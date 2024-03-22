import type {
  ComparisonChartRequest,
  ComparisonChartResponse,
} from "@/utils/types";

import {
  comparisonChartRequestSchema,
  comparisonChartResponseSchema,
} from "@/validation/schema";
import { postValidationHandler } from "@/utils/fetchValidationHandlers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const urlExtractor = (body: ComparisonChartRequest) => {
    const { id, currency, days } = body;

    const fetchHead = "https://api.coingecko.com/api/v3/coins";
    const fetchBody = `/${id}/market_chart?vs_currency=${currency}&days=${days}`;
    const fetchTail = `&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;
    return [fetchHead, fetchBody, fetchTail].join("");
  };

  return postValidationHandler<ComparisonChartRequest, ComparisonChartResponse>(
    req,
    comparisonChartRequestSchema,
    comparisonChartResponseSchema,
    urlExtractor
  );
}
