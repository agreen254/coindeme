"use client";

import type { MarketFetchParam } from "@/utils/types";

import { marketFetchParamMap } from "@/utils/maps";
import {
  useMarketTableCurrentPage,
  useMarketTableNumFetchedPages,
  useMarketTableMode,
} from "@/hooks/useMarketTable";

import { Coins as CoinsIcon } from "lucide-react";

type Props = {
  disablePreviousPage?: boolean;
  disableNextPage?: boolean;
  handleNextPage?: () => void;
  handlePreviousPage?: () => void;
};

const MarketTableCaption = ({
  disablePreviousPage,
  disableNextPage,
  handleNextPage,
  handlePreviousPage,
}: Props) => {
  const tableMode = useMarketTableMode();
  const fetchOrder: "asc" | "desc" = "desc";
  const fetchParam: MarketFetchParam = "market_cap";

  const currentPage = useMarketTableCurrentPage();
  const totalPages = useMarketTableNumFetchedPages();

  const handlePageDisplay = () => {
    if (tableMode === "paginated") {
      const range =
        currentPage === 0
          ? 50
          : `${currentPage * 50 + 1}-${50 * (currentPage + 1)}`;
      return fetchOrder === "desc" ? `top ${range}` : `bottom ${range}`;
    } else {
      const numRecords = totalPages * 50;
      return fetchOrder === "desc"
        ? `top ${numRecords}`
        : `bottom ${numRecords}`;
    }
  };

  return (
    <div className="flex justify-between w-table-xl pt-4 -mb-1 gap-x-2 rounded-t-xl dark:bg-zinc-900/70 dark:border-zinc-900/70 opacity-90 shadow-[0_-1px_2px_0_#404040]">
      <div className="ml-6">
        <span>
          <CoinsIcon className="w-6 h-6 mr-2 -translate-y-1 inline" />
        </span>
        <span className="mr-2 text-2xl font-bold uppercase">
          {handlePageDisplay()}
        </span>
        <span className="mr-2 text-lg text-gray-400 font-normal uppercase">
          by
        </span>
        <span className="mr-2 text-lg text-gray-400 font-normal uppercase">
          {marketFetchParamMap.get(fetchParam)}
        </span>
      </div>
      {tableMode === "paginated" && (
        <div className="flex gap-x-4 mr-4 text-sm font-medium">
          <button
            className="py-1 w-32 rounded-md dark:bg-teal-800 dark:disabled:bg-stone-800 disabled:text-primary/50 disabled:cursor-not-allowed"
            disabled={disablePreviousPage}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <button
            className="py-1 w-32 rounded-md dark:bg-teal-800 dark:disabled:bg-stone-800 disabled:text-primary/50 disabled:cursor-not-allowed"
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
