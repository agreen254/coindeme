"use client";

import Link from "next/link";
import { Coins as CoinsIcon } from "lucide-react";

import CaretIcon from "@/Icons/Caret";
import { marketFetchParamMap } from "@/utils/maps";
import { useMarketTableCurrentPage } from "@/hooks/useMarketTable";
import { useMarketParams } from "@/hooks/useMarketParams";
import {
  MARKET_FIELD_KEY,
  MARKET_ORDER_KEY,
  MARKET_ORDER_BY_KEY,
  MARKET_TABLE_MODE_KEY,
} from "@/validation/defaults";

type Props = {
  disablePreviousPage?: boolean;
  disableNextPage?: boolean;
  handleNextPage?: () => void;
  handlePreviousPage?: () => void;
  numRecords: number;
};

const MarketTableCaption = ({
  disablePreviousPage,
  disableNextPage,
  handleNextPage,
  handlePreviousPage,
  numRecords,
}: Props) => {
  const { field, tableMode, order, orderBy } = useMarketParams();
  const otherField = field === "market_cap" ? "volume" : "market_cap";
  const currentPage = useMarketTableCurrentPage();

  const recordDisplay = (() => {
    if (tableMode === "paginated") {
      const range =
        currentPage === 0
          ? 50
          : `${currentPage * 50 + 1}-${50 * (currentPage + 1)}`;
      return `top ${range}`;
    } else {
      return `top ${numRecords}`;
    }
  })();

  return (
    <div className="flex justify-between w-table-xl mt-8 screen-lg:mt-auto pt-4 -mb-1 gap-x-2 rounded-t-xl bg-white dark:bg-zinc-900/70 dark:border-zinc-900/70 opacity-90 shadow-[0_-1px_2px_0_#A1A1AA] dark:shadow-[0_-1px_2px_0_#404040]">
      <div className="ml-6">
        <span>
          <CoinsIcon className="w-6 h-6 mr-2 -translate-y-1 inline" />
        </span>
        <span className="mr-2 text-2xl font-bold uppercase">
          {recordDisplay}
        </span>
        <span className="mr-2 text-lg text-gray-600 dark:text-gray-200 font-normal uppercase">
          by
        </span>
        <span className="mr-2 text-2xl font-semibold uppercase">
          {marketFetchParamMap.get(field)}
        </span>
        <Link
          href={{
            pathname: "/",
            query: {
              [MARKET_FIELD_KEY]: otherField,
              [MARKET_ORDER_KEY]: order,
              [MARKET_ORDER_BY_KEY]: orderBy,
              [MARKET_TABLE_MODE_KEY]: tableMode,
            },
          }}
          scroll={false}
        >
          <CaretIcon className="h-4 w-4 inline rotate-180 -translate-y-1 fill-gray-600 dark:fill-gray-200 hover:dark:fill-menu-highlight hover:fill-menu-highlight" />
        </Link>
      </div>
      {tableMode === "paginated" && (
        <div className="flex gap-x-4 mr-4 text-sm font-medium">
          <button
            className="py-1 w-32 rounded-md bg-teal-300 dark:bg-teal-800 dark:disabled:bg-stone-800 disabled:text-primary/50 disabled:cursor-not-allowed"
            disabled={disablePreviousPage}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <button
            className="py-1 w-32 rounded-md bg-teal-300 dark:bg-teal-800 dark:disabled:bg-stone-800 disabled:text-primary/50 disabled:cursor-not-allowed"
            disabled={disableNextPage}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketTableCaption;
