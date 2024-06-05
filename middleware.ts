import { type NextRequest, NextResponse } from "next/server";
import {
  marketFetchFieldSchema,
  marketFetchOrderBySchema,
  marketFetchOrderSchema,
  marketTableModeSchema,
} from "@/validation/schema";
import {
  MARKET_FIELD_KEY,
  MARKET_ORDER_KEY,
  MARKET_ORDER_BY_KEY,
  MARKET_TABLE_MODE_KEY,
  DEFAULT_MARKET_FIELD,
  DEFAULT_MARKET_ORDER,
  DEFAULT_MARKET_ORDER_BY,
  DEFAULT_MARKET_TABLE_MODE,
} from "./validation/defaults";
import { NextURL } from "next/dist/server/web/next-url";
import { validateSearchParams } from "./validation/searchParamsValidator";

/**
 * Creating a new URL instance will strip the searchParams from the NextURL instance.
 *
 * A new NextURL instance is then instantiated from the URL instance, maintaining the
 * ability to use the extended NextURL API.
 */
function clearSearchParams(url: NextURL) {
  return new NextURL(new URL(url));
}

function handleMarketSearchParams(url: NextURL, searchParams: URLSearchParams) {
  const marketParams = [
    {
      schema: marketFetchFieldSchema,
      key: MARKET_FIELD_KEY,
      fallback: DEFAULT_MARKET_FIELD,
    },
    {
      schema: marketFetchOrderSchema,
      key: MARKET_ORDER_KEY,
      fallback: DEFAULT_MARKET_ORDER,
    },
    {
      schema: marketFetchOrderBySchema,
      key: MARKET_ORDER_BY_KEY,
      fallback: DEFAULT_MARKET_ORDER_BY,
    },
    {
      schema: marketTableModeSchema,
      key: MARKET_TABLE_MODE_KEY,
      fallback: DEFAULT_MARKET_TABLE_MODE,
    },
  ];

  let flag = false;

  // make sure the infinite table is always sorted via the ascending called index
  if (searchParams.get("table_mode") === "infinite") {
    const order = searchParams.get("order");
    const orderBy = searchParams.get("orderBy");

    if (order !== DEFAULT_MARKET_ORDER || orderBy !== DEFAULT_MARKET_ORDER_BY) {
      flag = true;
      searchParams.set("order", DEFAULT_MARKET_ORDER);
      searchParams.set("orderBy", DEFAULT_MARKET_ORDER_BY);
    }
  }

  // make sure user cannot tamper with search params to make one unusable
  const validations = validateSearchParams(marketParams, searchParams);
  if (validations.some((v) => v.originalStatus === false)) {
    flag = true;
    validations.forEach((v) => {
      if (!v.originalStatus) searchParams.set(v.key, v.data);
    });
  }

  return flag ? NextResponse.redirect(url) : null;
}

export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const searchParams = req.nextUrl.searchParams;

  switch (nextUrl.pathname) {
    case "/": {
      return handleMarketSearchParams(nextUrl, searchParams);
    }
    default: {
      return NextResponse.rewrite(clearSearchParams(nextUrl));
    }
  }
}
