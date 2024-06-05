import { useSearchParams } from "next/navigation";
import type {
  MarketFetchField,
  MarketFetchOrder,
  MarketFetchOrderBy,
  MarketTableMode,
} from "@/utils/types";
import {
  MARKET_FIELD_KEY,
  MARKET_ORDER_KEY,
  MARKET_ORDER_BY_KEY,
  MARKET_TABLE_MODE_KEY,
} from "@/validation/defaults";

export function useMarketParams() {
  const searchParams = useSearchParams();

  // the middleware has already ensured the searchParams are all valid
  // so assert validity using `as`
  const field = searchParams.get(MARKET_FIELD_KEY) as MarketFetchField;
  const order = searchParams.get(MARKET_ORDER_KEY) as MarketFetchOrder;
  const orderBy = searchParams.get(MARKET_ORDER_BY_KEY) as MarketFetchOrderBy;
  const tableMode = searchParams.get(MARKET_TABLE_MODE_KEY) as MarketTableMode;

  return { field, order, orderBy, tableMode };
}
