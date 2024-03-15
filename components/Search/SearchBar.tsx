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

  const highlightMatchedChars = (result: Fuzzysort.Result) => {
    return fuzzysort.highlight(result, (m, i) => (
      <span
        key={result + "highlight" + i}
        className="font-semibold text-red-500"
      >
        {m}
      </span>
    ));
  };
  const handleNameMatch = (wrapper: SearchResultWrapper) => {
    const symbol = wrapper.otherText;
    return (
      <span>
        {highlightMatchedChars(wrapper.result)} {symbol}
      </span>
    );
  };
  const handleSymbolMatch = (wrapper: SearchResultWrapper) => {
    const name = wrapper.otherText;
    return (
      <span>
        {name} {highlightMatchedChars(wrapper.result)}
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
          className="px-5 py-3 rounded-lg"
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />
        {bestResults.map((wrapper) => (
          <p key={wrapper.result.target + "searchResult"}>
            {wrapper.kind === "symbol"
              ? handleSymbolMatch(wrapper)
              : handleNameMatch(wrapper)}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
