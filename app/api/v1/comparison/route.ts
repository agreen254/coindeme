import type { ComparisonChartRequest, ComparisonChartResponse } from "@/utils/types";

import {
  comparisonChartRequestSchema,
  comparisonChartResponseSchema,
} from "@/validation/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: ComparisonChartRequest = await req.json();
  const bodyValidation = comparisonChartRequestSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new Error("Failed to validate the request.");
  }

  const { id, currency, days } = body;

  const fetchHead = "https://api.coingecko.com/api/v3/coins/";
  const fetchBody = `${id}/market_chart?vs_currency=${currency}&days=${days}`;
  const fetchTail = `&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;
  const fetchURL = [fetchHead, fetchBody, fetchTail].join("");

  let error: string | undefined;
  const comparisonRes = await fetch(fetchURL, {
    method: "GET",
  }).catch((e) => (error = e));

  if (error) {
    throw new Error(error);
  }
  if (!comparisonRes.ok) {
    throw new Error("The network response failed.");
  }

  const comparisonData = await comparisonRes.json();

  if (comparisonData?.status?.error_message) {
    throw new Error(comparisonData.status.error_message);
  }

  const comparisonDataValidation =
    comparisonChartResponseSchema.safeParse(comparisonData);
  if (!comparisonDataValidation.success) {
    throw new Error("Failed to validate comparison chart data.");
  }
  
  return NextResponse.json({
    comparisonData: comparisonData as ComparisonChartResponse,
  });
}
