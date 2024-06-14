"use client";

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

import type { MarketQueryResult } from "@/utils/types";
import { addMarketIndices } from "@/utils/addMarketIndices";
import { marketTableSort } from "@/utils/marketTableSort";
import {
  useMarketTableActions,
  useMarketTableCurrentPage,
} from "@/hooks/useMarketTable";
import { useMarketParams } from "@/hooks/useMarketParams";

import Loader from "../Loader";
import MarketTable from "./MarketTable";
import MarketTableCaption from "./MarketTableCaption";

type Props = {
  queryResult: MarketQueryResult;
};

const MarketTablePaginatedWrapper = ({
  queryResult: {
    data,
    error,
    isError,
    isPending,
    isFetching,
    isRefetching,
    fetchNextPage,
  },
}: Props) => {
  const currentPage = useMarketTableCurrentPage();
  const { setCurrentPage } = useMarketTableActions();

  const { order, orderBy } = useMarketParams();

  const tableData = data?.pages[currentPage]?.market || [];
  const indexedData = addMarketIndices(tableData);
  const sortedData = marketTableSort(indexedData, order, orderBy);

  const showLoader = !error && (isPending || isFetching);

  const disableNextPage =
    (!isRefetching && (isPending || isFetching)) || isError;
  const disablePreviousPage = disableNextPage || currentPage === 0 || isError;

  const handleNextPage = () => {
    if (data && data.pages.length <= currentPage + 1) {
      fetchNextPage();
    }
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-12">
        <MarketTableCaption
          disableNextPage={disableNextPage}
          disablePreviousPage={disablePreviousPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
        <MarketTable data={sortedData} initialIdx={50 * currentPage} />
        {!isFetching && (
          <div className="flex justify-center mt-4 gap-x-4">
            <button
              className="px-3 py-3 border rounded-lg hover:dark:bg-muted disabled:cursor-not-allowed"
              onClick={() => {
                window.scrollTo(0, 0);
                handlePreviousPage();
              }}
              disabled={disablePreviousPage}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              className="px-3 py-3 border rounded-lg hover:dark:bg-muted disabled:cursor-not-allowed"
              onClick={() => {
                window.scrollTo(0, 0);
                handleNextPage();
              }}
              disabled={disableNextPage}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}
        {showLoader && <Loader />}
      </div>
    </div>
  );
};

export default MarketTablePaginatedWrapper;
