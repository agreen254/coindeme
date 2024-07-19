import { type NextRequest, NextResponse } from "next/server";
import {
  marketFetchFieldSchema,
  marketFetchOrderBySchema,
  marketFetchOrderSchema,
  marketTableModeSchema,
} from "@/validation/schema";
import { NextURL } from "next/dist/server/web/next-url";
import { auth } from "./validation/auth";
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
import { validateSearchParams } from "./validation/searchParamsValidator";
import type { SearchParamValidationUnit } from "./utils/types";

function handleMarketSearchParams(url: NextURL, searchParams: URLSearchParams) {
  const marketParams: SearchParamValidationUnit[] = [
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

  // make sure user cannot tamper with search params to make one unusable
  const validations = validateSearchParams(marketParams, searchParams);
  if (validations.some((v) => v.originalStatus === false)) {
    flag = true;
    validations.forEach((v) => {
      if (!v.originalStatus) searchParams.set(v.key, v.data);
    });
  }

  // make sure the infinite table is always sorted via the ascending called index
  if (searchParams.get("table_mode") === "infinite") {
    const order = searchParams.get(MARKET_ORDER_KEY);
    const orderBy = searchParams.get(MARKET_ORDER_BY_KEY);

    if (order !== DEFAULT_MARKET_ORDER || orderBy !== DEFAULT_MARKET_ORDER_BY) {
      flag = true;
      searchParams.set(MARKET_ORDER_KEY, DEFAULT_MARKET_ORDER);
      searchParams.set(MARKET_ORDER_BY_KEY, DEFAULT_MARKET_ORDER_BY);
    }
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
      auth();
      return null;
    }
  }
}
