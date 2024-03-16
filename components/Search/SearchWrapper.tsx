"use client";

import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useState } from "react";

import SearchBar from "./SearchBar";
import SearchResultsMenu from "./SearchResultsMenu";

const SearchWrapper = () => {
  const [searchText, setSearchText] = useState("");

  // re-using the same query will not cause a double fetch
  const queryResult = useMarketQuery("usd", "market_cap", "desc");
  const targets = getSearchTargets(queryResult.data?.pages);

  if (!targets) {
    return (
      <div className="relative">
        <SearchBar disabled searchText="" setSearchText={setSearchText} />
      </div>
    );
  }

  const searchResults = getSearchResults(targets, searchText);

  return (
    <div className="flex justify-center">
      <div className="relative">
        <SearchBar
          disabled={false}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <SearchResultsMenu results={searchResults} searchText={searchText} />
      </div>
    </div>
  );
};

export default SearchWrapper;
