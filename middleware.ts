import { type NextRequest, NextResponse } from "next/server";
import {
  marketFetchFieldSchema,
  marketFetchOrderBySchema,
  marketFetchOrderSchema,
} from "@/validation/schema";
import {
  DEFAULT_MARKET_FIELD,
  DEFAULT_MARKET_ORDER,
  DEFAULT_MARKET_ORDER_BY,
} from "./validation/defaults";
import { NextURL } from "next/dist/server/web/next-url";
import { validateSearchParams } from "./validation/searchParamsValidator";

/**
 * If nothing is provided, redirect the user to default settings.
 *
 * Do the same if the user decides to manually edit the url and change a
 * param value to something that is unsupported.
 */
function handleMarketTable(url: NextURL, searchParams: URLSearchParams) {
  const marketParams = [
    {
      schema: marketFetchFieldSchema,
      key: "field",
      fallback: DEFAULT_MARKET_FIELD,
    },
    {
      schema: marketFetchOrderSchema,
      key: "order",
      fallback: DEFAULT_MARKET_ORDER,
    },
    {
      schema: marketFetchOrderBySchema,
      key: "orderBy",
      fallback: DEFAULT_MARKET_ORDER_BY,
    },
  ];

  const validations = validateSearchParams(marketParams, searchParams);
  if (validations.some((v) => v.originalStatus === false)) {
    validations.forEach((v) => searchParams.set(v.key, v.data));
    return NextResponse.redirect(url);
  }
}

export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const searchParams = req.nextUrl.searchParams;

  switch (nextUrl.basePath) {
    case "/": {
      return handleMarketTable(nextUrl, searchParams);
    }
  }
}
