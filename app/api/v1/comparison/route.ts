import type {
  ComparisonChartRequest,
  ComparisonChartResponse,
} from "@/utils/types";

import {
  comparisonChartRequestSchema,
  comparisonChartResponseSchema,
} from "@/validation/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: ComparisonChartRequest = await req.json();
  const bodyValidation = comparisonChartRequestSchema.safeParse(body);

  if (!bodyValidation.success) {
    return NextResponse.json(
      { message: "Failed to validate request." },
      { status: 400 }
    );
  }

  const { id, currency, days } = body;

  const fetchHead = "https://api.coingecko.com/api/v3/coins";
  const fetchBody = `/${id}/market_chart?vs_currency=${currency}&days=${days}`;
  const fetchTail = `&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;
  const fetchURL = [fetchHead, fetchBody, fetchTail].join("");

  const comparisonRes = await fetch(fetchURL);
  if (!comparisonRes.ok) {
    return NextResponse.json(
      {
        message: [comparisonRes.status, comparisonRes.statusText].join(" "),
      },
      {
        status: comparisonRes.status,
      }
    );
  }

  const comparisonData = await comparisonRes.json();
  if (comparisonData?.status?.error_message) {
    return NextResponse.json(
      {
        message: comparisonData.status.error_message,
      },
      { status: 500 }
    );
  }

  const comparisonDataValidation =
    comparisonChartResponseSchema.safeParse(comparisonData);
  if (!comparisonDataValidation.success) {
    return NextResponse.json(
      {
        message: "Failed to validate chart data.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(comparisonData as ComparisonChartResponse);
}
