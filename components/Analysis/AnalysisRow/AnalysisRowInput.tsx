"use client";

import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import DropdownMenuItem from "@/components/Dropdown/DropdownMenuItem";
import {
  HandleNameMatch,
  HandleSymbolMatch,
} from "@/components/Search/SearchResultsHelpers";
import SearchActivator from "@/components/Search/SearchActivator";

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
import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";

type Props = {
  dropdownId: string;
  coinId: string;
  setCoinId: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  activeIdHandler: () => void;
};

const AnalysisRowInput = ({
  dropdownId,
  coinId,
  setCoinId,
  query,
  setQuery,
  activeIdHandler,
}: Props) => {
  const currency = useUserCurrencySetting();
  const market = useMarketQuery(currency, "market_cap", "desc");

  const { isVisible, selectedIndex } = useDropdownUnitFromId(dropdownId);
  const { setIsUsingMouse, setSelectedIndex } =
    useDropdownSettersFromId(dropdownId);

  const targets = getSearchTargets(market.data?.pages);
  const name = coinNameFromId(coinId, targets);
  const results = targets ? getSearchResults(targets, query) : [];

  const resetDropdown = useDropdownResetFromId(dropdownId);
  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      setQuery(name);
      resetDropdown();
    }
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    activeIdHandler();
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        setIsUsingMouse(false);
        setSelectedIndex(
          selectedIndex > 0 ? selectedIndex - 1 : results.length - 1
        );
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setIsUsingMouse(false);
        setSelectedIndex(
          selectedIndex < results.length - 1 ? selectedIndex + 1 : 0
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
        if (results.length > 0 && results.length > selectedIndex) {
          const id =
            selectedIndex === -1 ? results[0].id : results[selectedIndex].id;
          setQuery(coinNameFromId(id, targets));
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
        searchResults={results}
        className="p-2 text-xl rounded-lg mr-2 dark:bg-black bg-white"
        localQuery={query}
        setLocalQuery={setQuery}
        onKeyDown={handleKeyDown}
      />
      <DropdownMenu
        ref={clickAwayRef}
        dropdownId={dropdownId}
        key="searchResults"
        className="w-[320px] max-h-[320px] overflow-y-auto dark:bg-black bg-white border border-zinc-300 overscroll-contain font-normal rounded-md text-zinc-800 dark:text-zinc-200 absolute top-[52px] z-10"
      >
        {results.map((wrapper, idx) => (
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
              {wrapper.kind === "symbol"
                ? HandleSymbolMatch(wrapper)
                : HandleNameMatch(wrapper)}
            </button>
          </DropdownMenuItem>
        ))}
        {results.length === 0 && (
          <p className="italic text-muted-foreground font-medium py-1 indent-3">
            No results found.
          </p>
        )}
      </DropdownMenu>
    </>
  );
};

export default AnalysisRowInput;
