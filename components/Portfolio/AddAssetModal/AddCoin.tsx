"use client";

import { cn } from "@/utils/cn";
import { ForwardedRef, forwardRef } from "react";
import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";
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

type Props = {
  coinId: string;
  setCoinId: (id: string) => void;
};

// forward the ref so we can keep track of when the menu is open
const AddCoin = forwardRef(
  ({ coinId, setCoinId }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const market = useMarketQuery("usd", "market_cap", "desc");
    const [query, setQuery] = useState("");

    const { setIsUsingMouse, selectedIndex, setSelectedIndex } =
      useDropdownStore((state) => state);

    const targets = getSearchTargets(market.data?.pages);
    const results = targets ? getSearchResults(targets, query) : [];

    const reset = useDropdownReset();
    const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
      () => {
        reset();

        // save the previous coin entered by
        // finding the object with the corresponding id and taking the corresponding name
        if (coinId !== "") {
          const coinNameFromId =
            targets?.find((target) => target.id === coinId)?.name || "";
          setQuery(coinNameFromId);
        }
      }
    );

    return (
      <div className="w-full">
        <div ref={clickAwayRef} className="relative">
          <SearchActivator
            disabled={!targets}
            searchResults={results}
            className="h-11 w-full p-2 rounded-lg bg-zinc-800/60"
            localQuery={query}
            setLocalQuery={setQuery}
          />
          <DropdownMenu
            motionKey="searchResults"
            className="w-[461px] max-h-[320px] overflow-y-auto bg-dropdown border border-stone-300 overscroll-contain font-normal rounded-md text-zinc-200 absolute top-[52px] z-10"
          >
            <div ref={ref}>
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
            </div>
          </DropdownMenu>
        </div>
      </div>
    );
  }
);

export default AddCoin;

AddCoin.displayName = "AddCoin";
