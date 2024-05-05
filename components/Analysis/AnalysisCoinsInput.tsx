"use client";

import { useState } from "react";

import { cn } from "@/utils/cn";
import { coinNameFromId } from "@/utils/coinNameFromId";
import { getSearchTargets, getSearchResults } from "@/utils/getSearchElements";
import { getOrdinal } from "@/utils/getOrdinal";
import { resultToItem } from "@/utils/resultToItem";
import { useAnalysisActions, useAnalysisCoins } from "@/hooks/useAnalysis";
import { useClickAway } from "@uidotdev/usehooks";
import { useDropdownResetFromId } from "@/hooks/useDropdownStore";
import { useDropdownSettersFromId } from "@/hooks/useDropdownStore";
import { useDropdownUnitFromId } from "@/hooks/useDropdownStore";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import DropdownMenu from "../Dropdown/DropdownMenu";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import {
  HandleNameMatch,
  HandleSymbolMatch,
} from "../Search/SearchResultsHelpers";
import SearchActivator from "../Search/SearchActivator";

type Props = {
  index: number;
  dropdownId: string;
};

const AnalysisCoinsInput = ({ index, dropdownId }: Props) => {
  const coin = useAnalysisCoins()[index];
  const { setCoin } = useAnalysisActions();

  const currency = useUserCurrencySetting();
  const market = useMarketQuery(currency, "market_cap", "desc");

  const targets = getSearchTargets(market.data?.pages);
  const [query, setQuery] = useState<string>(coin.name);
  const results = targets ? getSearchResults(targets, query) : [];

  const { isVisible, selectedIndex } = useDropdownUnitFromId(dropdownId);
  const { setIsUsingMouse, setSelectedIndex } =
    useDropdownSettersFromId(dropdownId);

  const resetDropdown = useDropdownResetFromId(dropdownId);
  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      setQuery(coin.name);
      resetDropdown();
    }
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          const coin =
            selectedIndex === -1 ? results[0] : results[selectedIndex];
          setQuery(coinNameFromId(coin.id, targets));
          setCoin(resultToItem(coin), index);
        }
        resetDropdown();
        break;
      }
      case "Escape": {
        setQuery(coin.name);
        resetDropdown();
        break;
      }
    }
  };

  return (
    <div className="relative">
      <label htmlFor={"analysisInput" + index} className="sr-only">
        input {getOrdinal(index)} coin
      </label>
      <SearchActivator
        id={"analysisInput" + index}
        type="text"
        dropdownId={dropdownId}
        autoComplete="off"
        spellCheck="false"
        searchResults={results}
        localQuery={query}
        setLocalQuery={setQuery}
        onKeyDown={handleKeyDown}
        className="h-11 w-[50%] text-lg p-2 pb-4 pl-10 rounded-none bg-inherit focus:outline-none border-b border-transparent focus:border-slice focus:border-grad-r-blue"
      />
      <DropdownMenu
        ref={clickAwayRef}
        dropdownId={dropdownId}
        key={"analysisDropdownMenu" + index}
        className="w-[280px] max-h-[320px] overflow-y-auto bg-dropdown border border-stone-300 overscroll-contain font-normal rounded-md text-zinc-200 absolute top-[52px] z-10"
      >
        {results.map((wrapper, idx) => (
          <DropdownMenuItem
            dropdownId={dropdownId}
            index={idx}
            key={wrapper.result.target + "analysisDropdownMenuItem" + index}
          >
            <button
              tabIndex={-1}
              className={cn(
                "indent-3 py-1 block w-full text-start",
                idx === selectedIndex && "bg-zinc-600"
              )}
              onClick={() => {
                setCoin(wrapper.id, index);
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
    </div>
  );
};

export default AnalysisCoinsInput;
