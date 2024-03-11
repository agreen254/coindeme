import type { Market, MarketRequest } from "@/utils/types";

import { marketRequest, marketSchema } from "@/validation/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: MarketRequest = await req.json();
  const bodyValidation = marketRequest.safeParse(body);

  const { page, currency, fetchParam, fetchOrder } = body;

  if (!bodyValidation.success) {
    return NextResponse.json(
      { message: "Failed to validate request." },
      { status: 400 }
    );
  }

  const fetchHead = "https://api.coingecko.com/api/v3/coins/markets";
  const fetchBody = `?vs_currency=${currency}&order=${fetchParam}_${fetchOrder}&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2c24h%2c7d`;
  const fetchTail = `&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;
  const fetchURL = [fetchHead, fetchBody, fetchTail].join("");

  const marketRes = await fetch(fetchURL);
  if (!marketRes.ok) {
    return NextResponse.json(
      {
        message: [marketRes.status, marketRes.statusText].join(" "),
      },
      {
        status: marketRes.status,
      }
    );
  }

  const market = await marketRes.json();

  // the coingecko api will return errors with this response format
  // e.g. you are being throttled, the api key is invalid, etc.
  if (market?.status?.error_message) {
    return NextResponse.json(
      {
        message: market.status.error_message,
      },
      { status: 500 }
    );
  }

  const marketValidation = marketSchema.safeParse(market);
  if (!marketValidation.success) {
    return NextResponse.json(
      {
        message: "Failed to validate market data.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    market: market as Market,
    nextPage: body.page + 1,
  });
}
