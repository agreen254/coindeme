import type { MarketElementWithIdx, MarketTableSortField } from "./types";

import { sort } from "fast-sort";

export function marketTableSort(
  data: MarketElementWithIdx[] | undefined,
  sortBy: MarketTableSortField,
  order: "asc" | "desc"
) {
  if (!data) return [];

  const handleOrder = (by: MarketTableSortField) => {
    return order === "asc"
      ? sort(data).by([{ asc: (ele) => ele[by] }, { asc: (ele) => ele.id }])
      : sort(data).by([{ desc: (ele) => ele[by] }, { asc: (ele) => ele.id }]);
  };

  return handleOrder(sortBy);
}
