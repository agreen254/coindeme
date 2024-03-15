"use client";

import type { SearchTargets } from "@/utils/types";

import fuzzysort from "fuzzysort";
import { getSearchResults } from "@/utils/getSearchElements";
import { useState } from "react";

type Props = {
  targets: SearchTargets;
};

type SearchResultWrapper = {
  result: Fuzzysort.Result;
  otherText: string;
  kind: string;
};

const SearchBar = ({ targets }: Props) => {
  const [searchText, setSearchText] = useState("");
  const bestResults = getSearchResults(targets, searchText);

  const highlightResult = (result: Fuzzysort.Result) => {
    return fuzzysort.highlight(result, (m, i) => (
      <span
        key={result + "highlight" + i}
        className="font-semibold text-red-500"
      >
        {m}
      </span>
    ));
  };
  const displayNameMatch = (wrapper: SearchResultWrapper) => {
    return (
      <span>
        {highlightResult(wrapper.result)} {wrapper.otherText}
      </span>
    );
  };
  const displaySymbolMatch = (wrapper: SearchResultWrapper) => {
    return (
      <span>
        {wrapper.otherText} {highlightResult(wrapper.result)}
      </span>
    );
  };

  return (
    <div className="flex justify-center">
      <div>
        <input
          type="search"
          placeholder="search coins"
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />
        {bestResults.map((wrapper) => (
          <p key={wrapper.result.target + "searchResult"}>
            {wrapper.kind === "symbol"
              ? displaySymbolMatch(wrapper)
              : displayNameMatch(wrapper)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
