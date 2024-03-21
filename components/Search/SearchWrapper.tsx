"use client";

import { createDropdownStore } from "@/hooks/useDropdown";
import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useSearchBarQuery } from "@/hooks/useSearchBar";
import { useState } from "react";

import { DropdownContext } from "@/hooks/useDropdown";
import SearchBar from "./SearchBar";
import SearchResultsMenu from "./SearchResultsMenu";

const SearchWrapper = () => {
  // re-using the same query will not cause a double fetch
  // but need to remember to adjust it once params are stored in local storage
  const queryResult = useMarketQuery("usd", "market_cap", "desc");
  const searchQuery = useSearchBarQuery();
  const targets = getSearchTargets(queryResult.data?.pages);
  const searchResults = targets ? getSearchResults(targets, searchQuery) : [];

  const [searchDropdownStore] = useState(() =>
    createDropdownStore({ menuSelectedIndex: -1 })
  );

  return (
    <div className="flex justify-center">
      <div className="relative mb-2">
        <DropdownContext.Provider value={searchDropdownStore}>
          {targets ? (
            <>
              <SearchBar disabled={false} results={searchResults} />
              <SearchResultsMenu results={searchResults} />
            </>
          ) : (
            <SearchBar disabled results={searchResults} />
          )}
        </DropdownContext.Provider>
      </div>
    </div>
  );
};

export default SearchWrapper;
