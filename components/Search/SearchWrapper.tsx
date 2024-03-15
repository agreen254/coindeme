"use client";

import type { SearchTargets } from "@/utils/types";

import { getSearchResults } from "@/utils/getSearchElements";
import { useState } from "react";

import SearchBar from "./SearchBar";
import SearchResultsMenu from "./SearchResultsMenu";

type Props = {
  targets: SearchTargets | undefined;
};

const SearchWrapper = ({ targets }: Props) => {
  const [searchText, setSearchText] = useState("");

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
