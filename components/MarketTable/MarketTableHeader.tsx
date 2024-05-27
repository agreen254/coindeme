"use client";

import type { MarketTableSortField } from "@/utils/types";

import { cn } from "@/utils/cn";
import {
  useMarketTableActions,
  useMarketTableMode,
  useMarketTableSortOrder,
  useMarketTableSortField,
} from "@/hooks/useMarketTable";

import { ListFilter as ListFilterIcon } from "lucide-react";
import { default as TH } from "./MarketTableHeaderCell";

const MarketTableHeader = () => {
  const sortActions = useMarketTableActions();
  const sortOrder = useMarketTableSortOrder();
  const sortSchema = useMarketTableSortField();
  const tableMode = useMarketTableMode();

  const isPaginated = tableMode === "paginated";
  const isInfinite = tableMode === "infinite";

  const handleSort = (schema: MarketTableSortField) => {
    if (sortSchema === schema) {
      sortActions.setPageSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      sortActions.setPageSortField(schema);
      sortActions.setPageSortOrder("desc");
    }
  };

  return (
    <thead className="bg-white dark:bg-inherit">
      <tr className="w-table-xl">
        <TH className="min-w-16 w-16 text-center rounded-bl-xl border-l">
          <button
            className={cn(isPaginated && "hover:dark:text-white")}
            onClick={() => handleSort("called_index")}
            disabled={isInfinite}
          >
            #
          </button>
        </TH>
        <TH className="min-w-64">
          <button
            className={cn(isPaginated && "hover:dark:text-white")}
            onClick={() => handleSort("name")}
            disabled={isInfinite}
          >
            Name
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </button>
        </TH>
        <TH className="min-w-32">
          <button
            className={cn(isPaginated && "hover:dark:text-white")}
            onClick={() => handleSort("current_price")}
            disabled={isInfinite}
          >
            Price
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </button>
        </TH>
        <TH className="min-w-24">
          <button
            className={cn(isPaginated && "hover:dark:text-white")}
            onClick={() => handleSort("price_change_percentage_1h_in_currency")}
            disabled={isInfinite}
          >
            1h
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </button>
        </TH>
        <TH className="min-w-24">
          <button
            className={cn(isPaginated && "hover:dark:text-white")}
            onClick={() =>
              handleSort("price_change_percentage_24h_in_currency")
            }
            disabled={isInfinite}
          >
            24h
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </button>
        </TH>
        <TH className="min-w-24">
          <button
            className={cn(isPaginated && "hover:dark:text-white")}
            onClick={() => handleSort("price_change_percentage_7d_in_currency")}
            disabled={isInfinite}
          >
            7d
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </button>
        </TH>
        <TH className="min-w-64 indent-2">24h Vol / Market Cap</TH>
        <TH className="min-w-64 indent-2">Circulating / Total Supply</TH>
        <TH className="min-w-[218px] rounded-br-xl border-r indent-2">
          Last 7d
        </TH>
      </tr>
    </thead>
  );
};

export default MarketTableHeader;
