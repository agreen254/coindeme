import type { Market, MarketRequest } from "@/utils/types";

import { marketRequest, marketSchema } from "@/validation/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: MarketRequest = await req.json();
  const bodyValidation = marketRequest.safeParse(body);

  const { page, currency, fetchParam, fetchOrder } = body;

  if (!bodyValidation.success) {
    throw new Error("Failed to validate the request.");
  }

  const fetchHead = "https://api.coingecko.com/api/v3/coins/markets";
  const fetchBody = `?vs_currency=${currency}&order=${fetchParam}_${fetchOrder}&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2c24h%2c7d`;
  const fetchTail = `&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;
  const fetchURL = [fetchHead, fetchBody, fetchTail].join("");

  let error: string | undefined;
  const marketRes = await fetch(fetchURL, {
    method: "GET",
  }).catch((e) => (error = e));

  if (error) {
    throw new Error(error);
  }
  if (!marketRes.ok) {
    throw new Error("The network response failed.");
  }
  const market = await marketRes.json();

  // the coingecko api will return errors with this response format
  // e.g. you are being throttled, the api key is invalid, etc.
  if (market?.status?.error_message) {
    throw new Error(market.status.error_message);
  }

  const marketValidation = marketSchema.safeParse(market);
  if (!marketValidation.success) {
    throw new Error("Failed to validate the market data.");
  }

  return NextResponse.json({
    market: market as Market,
    nextPage: body.page + 1,
  });
}
