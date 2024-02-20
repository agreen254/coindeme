import { useMarketTableMode } from "@/hooks/useMarketTable";
import { useMarketTableActions } from "@/hooks/useMarketTable";

const MarketTableSwapMode = () => {
  const tableMode = useMarketTableMode();
  const { setPageSortOrder, setPageSortField, setMarketTableMode } =
    useMarketTableActions();

  const handleTableMode = () => {
    if (tableMode === "infinite") {
      setMarketTableMode("paginated");
    } else {
      /**
       * Be sure to re-sort the entries to their numerically fetched order
       * when switching to infinite table mode.
       * If this is not done, when a new page is fetched via scrolling
       * it will cause new entries to pop in both above and below.
       */
      setPageSortField("called_index");
      setPageSortOrder("asc");
      setMarketTableMode("infinite");
    }
  };

  return (
    <div className="flex justify-end mb-2">
      <button
        className="px-3 py-2 mr-56 hover:bg-muted/70 rounded-md text-sm text-primary/70 font-light transition-colors"
        onClick={handleTableMode}
      >
        Swap View
      </button>
    </div>
  );
};

export default MarketTableSwapMode;
