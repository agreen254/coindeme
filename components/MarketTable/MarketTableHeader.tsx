"use client";

import Link from "next/link";
import { ListFilter as ListFilterIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { useMarketTableMode } from "@/hooks/useMarketTable";
import { useMarketParams } from "@/hooks/useMarketParams";
import {
  MARKET_FIELD_KEY,
  MARKET_ORDER_KEY,
  MARKET_ORDER_BY_KEY,
} from "@/validation/defaults";

import { default as TH } from "./MarketTableHeaderCell";

const MarketTableHeader = () => {
  const { field, order, orderBy } = useMarketParams();
  const tableMode = useMarketTableMode();

  const isPaginated = tableMode === "paginated";
  const isInfinite = tableMode === "infinite";

  const handleSortQuery = (clickedOrder: string) => {
    if (clickedOrder === order)
      return {
        pathname: "/",
        query: {
          [MARKET_FIELD_KEY]: field,
          [MARKET_ORDER_KEY]: order,
          [MARKET_ORDER_BY_KEY]: orderBy === "asc" ? "desc" : "asc",
        },
      };
    else
      return {
        pathname: "/",
        query: {
          [MARKET_FIELD_KEY]: field,
          [MARKET_ORDER_KEY]: clickedOrder,
          [MARKET_ORDER_BY_KEY]: orderBy,
        },
      };
  };

  const SortUnit = ({
    localOrder,
    children,
  }: {
    localOrder: string;
    children: React.ReactNode;
  }) => {
    return isInfinite ? (
      <span>{children}</span>
    ) : (
      <Link
        className={cn(isPaginated && "hover:dark:text-white")}
        scroll={false}
        href={handleSortQuery(localOrder)}
      >
        {children}
      </Link>
    );
  };

  return (
    <thead>
      <tr className="w-table-xl">
        <TH className="min-w-16 w-16 text-center rounded-bl-xl border-l">
          <SortUnit localOrder="called_index">#</SortUnit>
        </TH>
        <TH className="min-w-64">
          <SortUnit localOrder="name">
            Name
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </SortUnit>
        </TH>
        <TH className="min-w-32">
          <SortUnit localOrder="current_price">
            Price
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </SortUnit>
        </TH>
        <TH className="min-w-24">
          <SortUnit localOrder="price_change_percentage_1h_in_currency">
            1h
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </SortUnit>
        </TH>
        <TH className="min-w-24">
          <SortUnit localOrder="price_change_percentage_24h_in_currency">
            24h
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </SortUnit>
        </TH>
        <TH className="min-w-24">
          <SortUnit localOrder="price_change_percentage_7d_in_currency">
            7d
            {isPaginated && <ListFilterIcon className="w-3 h-3 ml-1 inline" />}
          </SortUnit>
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
