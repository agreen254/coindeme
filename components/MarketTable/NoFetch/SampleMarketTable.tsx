"use client";

import { addMarketIndices } from "@/utils/addMarketIndices";
import { marketTableSort } from "@/utils/marketTableSort";
import { sampleMarketTable } from "@/utils/dummyData/sampleMarketTable";
import {
  useMarketTableSortField,
  useMarketTableSortOrder,
} from "@/hooks/useMarketTable";

import MarketTable from "../MarketTable";
import MarketTableCaption from "../MarketTableCaption";

/**
 * Use this component to view an example table without needing to actually fetch any data.
 */
const SampleMarketTable = () => {
  const sortOrder = useMarketTableSortOrder();
  const sortSchema = useMarketTableSortField();
  const sampleDataWithIdx = addMarketIndices(sampleMarketTable);
  const sortedData = marketTableSort(sampleDataWithIdx, sortSchema, sortOrder);

  return (
    <div>
      <div className="flex flex-col items-center mb-12">
        <MarketTableCaption
          handleNextPage={() => null}
          handlePreviousPage={() => null}
          disableNextPage={true}
          disablePreviousPage={true}
        />
        <MarketTable data={sortedData} initialIdx={0} />
      </div>
    </div>
  );
};

export default SampleMarketTable;
