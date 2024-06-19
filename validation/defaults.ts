import {
  MarketFetchField,
  MarketFetchOrder,
  MarketFetchOrderBy,
  MarketTableMode,
} from "@/utils/types";

export const MARKET_FIELD_KEY = "field";
export const MARKET_ORDER_KEY = "order";
export const MARKET_ORDER_BY_KEY = "order_by";
export const MARKET_TABLE_MODE_KEY = "table_mode";

export const DEFAULT_MARKET_FIELD: MarketFetchField = "market_cap";
export const DEFAULT_MARKET_ORDER: MarketFetchOrder = "called_index";
export const DEFAULT_MARKET_ORDER_BY: MarketFetchOrderBy = "asc";
export const DEFAULT_MARKET_TABLE_MODE: MarketTableMode = "paginated";

export const ANALYSIS_DROPDOWN_ID = "analysisCoin";
