"use client";

import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useState } from "react";

import SearchBar from "./SearchBar";
import SearchResultsMenu from "./SearchResultsMenu";

const SearchWrapper = () => {
  const [searchText, setSearchText] = useState("");

  // re-using the same query will not cause a double fetch
  // but need to remember to adjust it once params are stored in local storage
  const queryResult = useMarketQuery("usd", "market_cap", "desc");
  const targets = getSearchTargets(queryResult.data?.pages);

  if (!targets) {
    return (
      <div className="relative mb-2">
        <SearchBar disabled searchText="" setSearchText={setSearchText} />
      </div>
    );
  }

  const searchResults = getSearchResults(targets, searchText);

  return (
    <div className="flex justify-center">
      <div className="relative mb-2">
        <SearchBar
          disabled={false}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <SearchResultsMenu
          results={searchResults}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </div>
    </div>
  );
};

export default SearchWrapper;
