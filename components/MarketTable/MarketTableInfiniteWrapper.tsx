"use client";

import type { MarketQueryResult } from "@/utils/types";

import { addMarketIndices } from "@/utils/addMarketIndices";
import { marketTableSort } from "@/utils/marketTableSort";
import { flatMarketRes } from "@/utils/flatMarketRes";
import {
  useMarketTableActions,
  useMarketTableSortOrder,
  useMarketTableSortField,
} from "@/hooks/useMarketTable";

import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/Loader";
import MarketTable from "./MarketTable";
import MarketTableCaption from "./MarketTableCaption";
import MarketTableSwapMode from "./MarketTableSwapMode";

type Props = {
  queryResult: MarketQueryResult;
};

const MarketTableInfiniteWrapper = ({
  queryResult: { data, error, isPending, isFetching, fetchNextPage },
}: Props) => {
  const { setNumFetchedPages: setTotalPages } = useMarketTableActions();
  setTotalPages(data?.pages.length ?? 0);

  const sortOrder = useMarketTableSortOrder();
  const sortField = useMarketTableSortField();

  const tableData = flatMarketRes(data?.pages) || [];
  const indexedData = addMarketIndices(tableData);
  const sortedData = marketTableSort(indexedData, sortField, sortOrder);

  const showLoader = !error && (isPending || isFetching);

  /**
   * Using the loader prop of the InfiniteScroll component
   * creates a second scrollbar nested within the table;
   * to avoid this handle loading below the component.
   */
  return (
    <div>
      <div className="flex flex-col items-center">
        <MarketTableSwapMode />
        <MarketTableCaption />
        <InfiniteScroll
          dataLength={tableData?.length || 0}
          next={fetchNextPage}
          hasMore={!data?.pages?.length || data.pages.length < 10}
          loader={<></>}
          endMessage={<p>End of list.</p>}
        >
          <div className="flex flex-col">
            <MarketTable data={sortedData} />
          </div>
        </InfiniteScroll>
        {showLoader && <Loader />}
      </div>
    </div>
  );
};

export default MarketTableInfiniteWrapper;
