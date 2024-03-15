"use client";

import type { SearchElements } from "@/utils/types";

import fuzzysort from "fuzzysort";
import { useState } from "react";

type Props = {
  elements: SearchElements;
};

const SearchBar = ({ elements }: Props) => {
  const [searchText, setSearchText] = useState("");
  const searchResults = fuzzysort.go(searchText, elements.names, {
    key: "name",
  });

  return (
    <div className="flex justify-center">
      <div>
        <input
          type="search"
          placeholder="search coins"
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />
        {searchResults.map((res) => (
          <p key={res.obj.name}>
            {fuzzysort.highlight(res, (m) => (
              <span className="font-semibold text-red-500">{m}</span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
