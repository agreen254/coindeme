"use client";

import DropdownMenu from "../Dropdown/DropdownMenu";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import { HighlightedSearchResult } from "@/components/Search/SearchResultsHelpers";
import SearchActivator from "../Search/SearchActivator";

import { useClickAway } from "@uidotdev/usehooks";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import {
  useDropdownResetFromId,
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";

import { cn } from "@/utils/cn";
import { coinNameFromId } from "@/utils/coinNameFromId";
import { processSearch } from "@/utils/getSearchElements";

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
  const currency = useUserCurrencySetting();
  const marketData = useMarketQuery(currency, "market_cap", "desc").data?.pages;

  const { isVisible, selectedIndex } = useDropdownUnitFromId(dropdownId);
  const { setIsUsingMouse, setSelectedIndex } =
    useDropdownSettersFromId(dropdownId);

  const { searchTargets, searchResults } = processSearch(marketData, query);
  const name = coinNameFromId(coinId, searchTargets);

  const resetDropdown = useDropdownResetFromId(dropdownId);
  const resetDropdownAndQuery = () => {
    resetDropdown();
    setQuery(name);
  };
  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => resetDropdownAndQuery()
  );
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    activeIdHandler();
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        setIsUsingMouse(false);
        setSelectedIndex(
          selectedIndex > 0 ? selectedIndex - 1 : searchResults.length - 1
        );
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setIsUsingMouse(false);
        setSelectedIndex(
          selectedIndex < searchResults.length - 1 ? selectedIndex + 1 : 0
        );
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (!isVisible) {
          break;
        }
        // if there are no results nothing will happen,
        // otherwise if user hits enter with nothing selected then default to the first result
        if (searchResults.length > 0 && searchResults.length > selectedIndex) {
          const id =
            selectedIndex === -1
              ? searchResults[0].id
              : searchResults[selectedIndex].id;
          setQuery(coinNameFromId(id, searchTargets));
          setCoinId(id);
        }
        resetDropdown();
        break;
      }
      case "Escape": {
        setQuery(name);
        resetDropdown();
        break;
      }
      case "Tab": {
        setQuery(name);
        if (isVisible) {
          e.preventDefault();
          break;
        }
      }
    }
  };

  return (
    <>
      <label htmlFor="coinSearch" className="sr-only">
        search coins
      </label>
      <SearchActivator
        id="coinSearch"
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
            key={wrapper.result.target + "searchResult"}
          >
            <button
              tabIndex={-1}
              className={cn(
                "indent-3 py-1 block w-full text-start",
                idx === selectedIndex && "bg-zinc-200 dark:bg-zinc-600"
              )}
              onClick={() => {
                setCoinId(wrapper.id);
                setQuery(
                  wrapper.kind === "symbol"
                    ? wrapper.otherText
                    : wrapper.result.target
                );
                resetDropdown();
              }}
              onMouseEnter={() => {
                setIsUsingMouse(true);
                setSelectedIndex(idx);
              }}
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

export default ConverterSearchInput;
