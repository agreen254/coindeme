import { useSearchParams } from "next/navigation";
import type {
  MarketFetchField,
  MarketFetchOrder,
  MarketFetchOrderBy,
} from "@/utils/types";

export function useMarketParams() {
  const searchParams = useSearchParams();

  const field = searchParams.get("field") as MarketFetchField;
  const order = searchParams.get("order") as MarketFetchOrder;
  const orderBy = searchParams.get("orderBy") as MarketFetchOrderBy;

  return { field, order, orderBy };
}
