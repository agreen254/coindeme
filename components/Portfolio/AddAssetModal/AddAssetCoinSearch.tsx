"use client";

import { KeyboardEvent } from "react";

import { cn } from "@/utils/cn";
import { coinNameFromId } from "@/utils/coinNameFromId";
import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";
import {
  useAddAsset,
  useAddAssetActions,
  useAddAssetCoinId,
} from "@/hooks/useAddAsset";
import { useClickAway } from "@uidotdev/usehooks";
import { useDropdownReset, useDropdownStore } from "@/hooks/useDropdownStore";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useState } from "react";

import DropdownMenu from "@/components/Dropdown/DropdownMenu";
import DropdownMenuItem from "@/components/Dropdown/DropdownMenuItem";
import {
  HandleNameMatch,
  HandleSymbolMatch,
} from "@/components/Search/SearchResultsHelpers";
import SearchActivator from "@/components/Search/SearchActivator";

const AddCoin = () => {
  const market = useMarketQuery("usd", "market_cap", "desc");
  const coinId = useAddAssetCoinId();
  const { setCoinId } = useAddAssetActions();
  const [query, setQuery] = useState("");

  const { isVisible, setIsUsingMouse, selectedIndex, setSelectedIndex } =
    useDropdownStore((state) => state);

  const targets = getSearchTargets(market.data?.pages);
  const results = targets ? getSearchResults(targets, query) : [];

  const reset = useDropdownReset();
  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      reset();

      // Persist the coin name if you've already selected a coin, and then
      // use the input again but don't choose a new coin
      if (coinId !== "") {
        setQuery(coinNameFromId(coinId, targets));
      }
    }
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      // stop the default event of jumping to the front/back of input text
      e.preventDefault();
      setIsUsingMouse(false);
      setSelectedIndex(
        selectedIndex > 0 ? selectedIndex - 1 : results.length - 1
      );
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsUsingMouse(false);
      setSelectedIndex(
        selectedIndex < results.length - 1 ? selectedIndex + 1 : 0
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (!isVisible) handleAddAsset();
      // if there are no results nothing will happen,
      // otherwise if user hits enter with nothing selected then default to the first result
      if (results.length > 0) {
        const id =
          selectedIndex === -1 ? results[0].id : results[selectedIndex].id;
        setQuery(coinNameFromId(id, targets));
        setCoinId(id);
      }
      reset();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      reset();
    }
  };

  const handleAddAsset = useAddAsset();

  return (
    <div className="w-full">
      <div ref={clickAwayRef} className="relative">
        <label htmlFor="coinSearch" className="sr-only">
          search coins to select asset
        </label>
        <SearchActivator
          id="coinSearch"
          autoComplete="off"
          disabled={!targets}
          searchResults={results}
          className="h-11 w-full p-2 rounded-lg bg-zinc-800/60"
          localQuery={query}
          setLocalQuery={setQuery}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <DropdownMenu
          key="searchResults"
          className="w-[461px] max-h-[320px] overflow-y-auto bg-dropdown border border-stone-300 overscroll-contain font-normal rounded-md text-zinc-200 absolute top-[52px] z-10"
        >
          {results.map((wrapper, idx) => (
            <DropdownMenuItem
              index={idx}
              key={wrapper.result.target + "searchResult"}
            >
              <button
                className={cn(
                  "indent-3 py-1 block w-full text-start",
                  idx === selectedIndex && "bg-zinc-600"
                )}
                onClick={() => {
                  setCoinId(wrapper.id);
                  setQuery(
                    wrapper.kind === "symbol"
                      ? wrapper.otherText
                      : wrapper.result.target
                  );
                  reset();
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
    </div>
  );
};

export default AddCoin;

AddCoin.displayName = "AddCoin";
