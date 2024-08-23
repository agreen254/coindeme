"use client";

import { addMarketIndices } from "@/utils/addMarketIndices";
import { marketTableSort } from "@/utils/marketTableSort";
import { sampleMarketTable } from "@/utils/dummyData/sampleMarketTable";
import { useMarketParams } from "@/hooks/useMarketParams";

import MarketTable from "../MarketTable";
import MarketTableCaption from "../MarketTableCaption";

/**
 * Use this component to view an example table without needing to actually fetch any data.
 */
const SampleMarketTable = () => {
  const { order, orderBy } = useMarketParams();

  const sampleDataWithIdx = addMarketIndices(sampleMarketTable);
  const sortedData = marketTableSort(sampleDataWithIdx, order, orderBy);

  return (
    <div>
      <div className="flex flex-col items-center mb-12">
        <MarketTableCaption
          handleNextPage={() => null}
          handlePreviousPage={() => null}
          disableNextPage={true}
          disablePreviousPage={true}
          numRecords={0}
        />
        <MarketTable data={sortedData} initialIdx={0} />
      </div>
    </div>
  );
};

export default SampleMarketTable;
