"use client";

import { useState, useId } from "react";

import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import DropdownMenuItem from "@/components/Dropdown/DropdownMenuItem";
import { HighlightedSearchResult } from "@/components/Search/SearchResultsHelpers";
import SearchActivator from "@/components/Search/SearchActivator";

import { useAnalysisActions, useAnalysisSeries } from "@/hooks/useAnalysis";
import { useClickAway } from "@uidotdev/usehooks";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import {
  useDropdownResetFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";

import { cn } from "@/utils/cn";
import { coinNameFromId } from "@/utils/coinNameFromId";
import { getAdjustedIdxAndId, processSearch } from "@/utils/getSearchElements";
import { AnalysisSeries, CustomKeyHandlers } from "@/utils/types";
import { useDropdownKeyEvents } from "@/hooks/useDropdownKeyEvents";
import { useDropdownMenuMouseEnter } from "@/hooks/useDropdownMenuMouseEnter";

type Props = {
  dropdownId: string;
  series: AnalysisSeries;
  selectorIndex: number;
};

const AnalysisSeriesSelector = ({
  dropdownId,
  series,
  selectorIndex,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>(series.name);

  const activatorId = useId();
  const currency = useUserCurrencySetting();
  const resetDropdown = useDropdownResetFromId(dropdownId);
  const marketData = useMarketQuery(currency, "market_cap", "desc").data?.pages;
  const { updateSeries } = useAnalysisActions();
  const { selectedIndex } = useDropdownUnitFromId(dropdownId);

  const currentSeriesIds = useAnalysisSeries().map((s) => s.id);
  const idIsInUse = (maybeNewSeriesId: string) =>
    currentSeriesIds.includes(maybeNewSeriesId);

  const { searchTargets, searchResults, numResults } = processSearch(
    marketData,
    searchQuery
  );
  const currentName = coinNameFromId(series.id, searchTargets);

  const resetDropdownAndQuery = () => {
    setSearchQuery(currentName);
    resetDropdown();
  };

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => resetDropdownAndQuery()
  );

  const handleMouseEnter = useDropdownMenuMouseEnter(dropdownId);
  const customKeyHandlers: CustomKeyHandlers = {
    Enter: (e) => {
      e.preventDefault();

      // nothing to do
      if (numResults === 0) {
        resetDropdownAndQuery();
        return;
      } else handleUpdate();
    },
    Escape: (_) => resetDropdownAndQuery(),
    Tab: (_) => resetDropdownAndQuery(),
  };

  const handleUpdate = () => {
    // if the user hasn't selected a specific index (i.e. just focuses the input and hits enter)
    // the selectedIndex value will be -1, but need it to behave like 0 to get the relevant id.
    // const adjustedIndex = selectedIndex === -1 ? 0 : selectedIndex;
    // const adjustedId = searchResults[adjustedIndex].id;
    const { adjustedIndex, adjustedId } = getAdjustedIdxAndId(
      selectedIndex,
      searchResults
    );
    const canSelect = adjustedIndex >= 0 && !idIsInUse(adjustedId);

    if (canSelect) {
      const newCoinName = coinNameFromId(adjustedId, searchTargets);
      setSearchQuery(newCoinName);
      updateSeries(selectorIndex, adjustedId, newCoinName);
    } else resetDropdownAndQuery();
  };

  const handleKeyDown = useDropdownKeyEvents(
    dropdownId,
    numResults,
    customKeyHandlers
  );

  return (
    <>
      <label htmlFor={activatorId} className="sr-only">
        search coins
      </label>
      <SearchActivator
        id={activatorId}
        type="text"
        dropdownId={dropdownId}
        autoComplete="off"
        spellCheck="false"
        searchResults={searchResults}
        className="p-2 text-sm screen-lg:text-base screen-xl:text-lg rounded-lg w-[260px] mr-2 dark:bg-black bg-white"
        query={searchQuery}
        setQuery={setSearchQuery}
        onKeyDown={handleKeyDown}
      />
      <DropdownMenu
        ref={clickAwayRef}
        dropdownId={dropdownId}
        key="searchResults"
        className="w-full max-w-[80vw] max-h-[320px] overflow-y-auto dark:bg-black bg-white border border-zinc-300 overscroll-contain font-normal rounded-md text-zinc-800 dark:text-zinc-200 absolute top-[40px] z-10"
      >
        {searchResults.map((wrapper, menuItemIdx) => (
          <DropdownMenuItem
            dropdownId={dropdownId}
            index={menuItemIdx}
            key={wrapper.result.target + "searchResult"}
          >
            <button
              tabIndex={-1}
              className={cn(
                "indent-3 py-1 block w-full text-start disabled:line-through",
                menuItemIdx === selectedIndex && "bg-zinc-200 dark:bg-zinc-600"
              )}
              onClick={handleUpdate}
              onMouseEnter={handleMouseEnter(menuItemIdx)}
              disabled={idIsInUse(wrapper.id)}
            >
              <HighlightedSearchResult wrapper={wrapper} />
            </button>
          </DropdownMenuItem>
        ))}
        {searchResults.length === 0 && (
          <p className="italic text-muted-foreground font-medium py-1 indent-3">
            No results found.
          </p>
        )}
      </DropdownMenu>
    </>
  );
};

export default AnalysisSeriesSelector;
