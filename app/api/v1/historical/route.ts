import type { HistoricalRequest, HistoricalResponse } from "@/utils/types";

import { NextRequest, NextResponse } from "next/server";
import {
  historicalRequestSchema,
  historicalResponseSchema,
} from "@/validation/schema";

export async function POST(req: NextRequest) {
  const body: HistoricalRequest = await req.json();
  const bodyValidation = historicalRequestSchema.safeParse(body);

  if (!bodyValidation.success) {
    return NextResponse.json(
      { message: "Failed to validate request." },
      { status: 400 }
    );
  }

  const { date, id } = body;
  const fetchHead = "https://api.coingecko.com/api/v3/coins";
  const fetchBody = `/${id}/history?date=${date}`;
  const fetchTail = `&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;
  const fetchURL = [fetchHead, fetchBody, fetchTail].join("");

  const response = await fetch(fetchURL);
  if (!response.ok) {
    return NextResponse.json(
      {
        message: [response.status, response.statusText].join(" "),
      },
      {
        status: response.status,
      }
    );
  }

  const responseData = await response.json();
  const responseValidation = historicalResponseSchema.safeParse(responseData);
  if (!responseValidation.success) {
    return NextResponse.json(
      {
        message: "Failed to validate response.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(responseData as HistoricalResponse);
}
