import { type NextRequest, NextResponse } from "next/server";
import {
  marketFetchFieldSchema,
  marketFetchOrderSchema,
} from "@/validation/schema";
import {
  DEFAULT_MARKET_FIELD,
  DEFAULT_MARKET_ORDER,
} from "./hooks/useMarketParams";
import { NextURL } from "next/dist/server/web/next-url";

/**
 * If nothing is provided, redirect the user to default settings.
 *
 * Do the same if the user decides to manually edit the url and change a
 * param value to something that is unsupported.
 */
function handleMarketTable(url: NextURL, searchParams: URLSearchParams) {
  const validField = marketFetchFieldSchema.safeParse(
    searchParams.get("field")
  );
  const validOrder = marketFetchOrderSchema.safeParse(
    searchParams.get("order")
  );

  if (!validField.success || !validOrder.success) {
    searchParams.set(
      "field",
      validField.success ? validField.data : DEFAULT_MARKET_FIELD
    );
    searchParams.set(
      "order",
      validOrder.success ? validOrder.data : DEFAULT_MARKET_ORDER
    );

    return NextResponse.redirect(url);
  }
}

export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const searchParams = req.nextUrl.searchParams;

  if (nextUrl.pathname === "/") return handleMarketTable(nextUrl, searchParams);
}
