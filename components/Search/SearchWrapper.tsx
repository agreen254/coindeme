"use client";

import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useSearchBarQuery } from "@/hooks/useSearchBar";

import SearchBar from "./SearchBar";
import SearchResultsMenu from "./SearchResultsMenu";

const SearchWrapper = () => {
  // re-using the same query will not cause a double fetch
  // but need to remember to adjust it once params are stored in local storage
  const queryResult = useMarketQuery("usd", "market_cap", "desc");
  const searchQuery = useSearchBarQuery();
  const targets = getSearchTargets(queryResult.data?.pages);
  const searchResults = targets ? getSearchResults(targets, searchQuery) : [];

  if (!targets) {
    return (
      <div className="relative mb-2">
        <SearchBar disabled results={searchResults} />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="relative mb-2">
        <SearchBar disabled={false} results={searchResults} />
        <SearchResultsMenu results={searchResults} />
      </div>
    </div>
  );
};

export default SearchWrapper;
