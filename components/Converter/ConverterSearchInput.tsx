"use client";

import { useId } from "react";

import { HighlightedSearchResult } from "@/components/Search/SearchResultsHelpers";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useDropdownResetFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";
import { useDropdownKeyEvents } from "@/hooks/useDropdownKeyEvents";
import { useDropdownMenuMouseEnter } from "@/hooks/useDropdownMenuMouseEnter";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

import { cn } from "@/utils/cn";
import { coinNameFromId } from "@/utils/coinNameFromId";
import { getAdjustedIdxAndId } from "@/utils/getSearchElements";
import { CustomKeyHandlers, SearchResultWrapper } from "@/utils/types";

import DropdownMenu from "../Dropdown/DropdownMenu";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import SearchActivator from "../Search/SearchActivator";
import SearchStatus from "../Search/SearchStatus";

type Props = {
  dropdownId: string;
  coinId: string;
  setCoinId: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  activeIdHandler: () => void;
};

const ConverterSearchInput = ({
  dropdownId,
  coinId,
  setCoinId,
  query,
  setQuery,
  activeIdHandler,
}: Props) => {
  const activatorId = useId();
  const { selectedIndex } = useDropdownUnitFromId(dropdownId);

  const { searchTargets, searchResults, numResults, noResults, isLoading } =
    useDebouncedSearch(query);
  const name = coinNameFromId(coinId, searchTargets);

  const resetDropdown = useDropdownResetFromId(dropdownId);
  const resetDropdownAndQuery = () => {
    resetDropdown();
    setQuery(name);
  };
  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => resetDropdownAndQuery()
  );

  const customKeyHandlers: CustomKeyHandlers = {
    Enter: (e) => {
      e.preventDefault();
      if (numResults) {
        const { adjustedId } = getAdjustedIdxAndId(
          selectedIndex,
          searchResults
        );
        setCoinId(adjustedId);
        setQuery(coinNameFromId(adjustedId, searchTargets));
        resetDropdown();
      } else resetDropdownAndQuery();
    },
    Escape: (_) => resetDropdownAndQuery(),
    Tab: (_) => resetDropdownAndQuery(),
  };

  const keyHandlers = useDropdownKeyEvents(
    dropdownId,
    numResults,
    customKeyHandlers
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    activeIdHandler();
    keyHandlers(e);
  };

  const handleMouseEnter = useDropdownMenuMouseEnter(dropdownId);

  const handleClick = (wrapper: SearchResultWrapper) => () => {
    setCoinId(wrapper.id);
    setQuery(
      wrapper.kind === "symbol" ? wrapper.otherText : wrapper.result.target
    );
    resetDropdown();
  };

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
        className="h-11 w-[50%] text-lg p-2 pb-4 pl-10 rounded-none bg-inherit focus:outline-none border-b border-transparent focus:border-slice focus:border-grad-r-blue"
        query={query}
        setQuery={setQuery}
        onKeyDown={handleKeyDown}
      />
      <DropdownMenu
        ref={clickAwayRef}
        dropdownId={dropdownId}
        key="searchResults"
        className="w-[320px] max-h-[320px] overflow-y-auto bg-dropdown border border-zinc-300 overscroll-contain font-normal rounded-md text-zinc-800 dark:text-zinc-200 absolute top-[52px]"
      >
        {searchResults.map((wrapper, idx) => (
          <DropdownMenuItem
            dropdownId={dropdownId}
            index={idx}
            key={wrapper.id + "searchResult"}
          >
            <button
              tabIndex={-1}
              className={cn(
                "indent-3 py-1 block w-full text-start",
                idx === selectedIndex && "bg-zinc-200 dark:bg-zinc-600"
              )}
              onClick={handleClick(wrapper)}
              onMouseEnter={handleMouseEnter(idx)}
            >
              <HighlightedSearchResult wrapper={wrapper} />
            </button>
          </DropdownMenuItem>
        ))}
        <SearchStatus isLoading={isLoading} noResults={noResults} />
      </DropdownMenu>
    </>
  );
};

export default ConverterSearchInput;
