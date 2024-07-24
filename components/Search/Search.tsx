"use client";

import Link from "next/link";

import { cn } from "@/utils/cn";
import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";
import { useClickAway } from "@uidotdev/usehooks";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useSearchQuery, useSearchQueryActions } from "@/hooks/useSearch";
import SearchIcon from "@/Icons/Search";
import {
  useDropdownResetFromId,
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";

import DropdownMenu from "../Dropdown/DropdownMenu";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import { HandleNameMatch, HandleSymbolMatch } from "./SearchResultsHelpers";
import SearchActivator from "./SearchActivator";

type Props = {
  dropdownId: string;
};

const Search = ({ dropdownId }: Props) => {
  // re-using the same query will not cause a double fetch
  // but need to remember to adjust it once params are stored in local storage
  const market = useMarketQuery("usd", "market_cap", "desc");
  const query = useSearchQuery();
  const { setQuery } = useSearchQueryActions();
  const { selectedIndex } = useDropdownUnitFromId(dropdownId);
  const { setIsUsingMouse, setSelectedIndex } =
    useDropdownSettersFromId(dropdownId);

  const targets = getSearchTargets(market.data?.pages);
  const results = targets ? getSearchResults(targets, query) : [];

  const resetDropdown = useDropdownResetFromId(dropdownId);
  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      setQuery("");
      resetDropdown();
    }
  );

  return (
    <div className="flex justify-center">
      <div ref={clickAwayRef} className="relative">
        <label htmlFor="mainSearch" className="sr-only">
          Search Coins
        </label>
        <SearchActivator
          dropdownId={dropdownId}
          id="mainSearch"
          disabled={!targets}
          searchResults={results}
          className="pr-5 pl-12 py-[9px] w-[320px] rounded-md dark:bg-white/10 focus:outline-none focus:ring-[1.5px] focus:ring-black/50 focus:dark:ring-white/50 shadow-top shadow-zinc-500/60 disabled:cursor-not-allowed"
          autoComplete="off"
        />
        <SearchIcon className="hidden screen-sm:inline w-[18px] h-[18px] absolute left-4 top-[12px] fill-default" />
        <DropdownMenu
          dropdownId={dropdownId}
          key="searchResults"
          className="w-[320px] max-h-[320px] overflow-y-auto bg-dropdown border border-zinc-300 overscroll-contain font-normal rounded-md text-zinc-800 dark:text-zinc-200 absolute top-[52px] z-10"
        >
          {results.map((wrapper, idx) => (
            <DropdownMenuItem
              dropdownId={dropdownId}
              index={idx}
              key={wrapper.result.target + "searchResult"}
            >
              <Link
                href={`/coin/${wrapper.id}`}
                tabIndex={-1}
                onClick={resetDropdown}
                className={cn(
                  "indent-3 py-1 block",
                  idx === selectedIndex && "bg-zinc-200 dark:bg-zinc-600"
                )}
                onMouseEnter={() => {
                  setIsUsingMouse(true);
                  setSelectedIndex(idx);
                }}
              >
                {wrapper.kind === "symbol"
                  ? HandleSymbolMatch(wrapper)
                  : HandleNameMatch(wrapper)}
              </Link>
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

export default Search;
