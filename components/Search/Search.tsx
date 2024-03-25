"use client";

import { getSearchResults, getSearchTargets } from "@/utils/getSearchElements";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useSearchQuery } from "@/hooks/useSearch";

import SearchActivator from "./SearchActivator";
import SearchResultsMenu from "./SearchResultsMenu";
import SearchResultsMenuItem from "./SearchResultsMenuItem";

const Search = () => {
  // re-using the same query will not cause a double fetch
  // but need to remember to adjust it once params are stored in local storage
  const market = useMarketQuery("usd", "market_cap", "desc");

  const query = useSearchQuery();
  const targets = getSearchTargets(market.data?.pages);
  const results = targets ? getSearchResults(targets, query) : [];

  return (
    <div className="flex justify-center">
      <div className="relative mb-2">
        {targets ? (
          <>
            <SearchActivator disabled={false} results={results} />
            <SearchResultsMenu>
              {results.map((wrapper, idx) => (
                <SearchResultsMenuItem
                  key={wrapper.result.target + "searchResult"}
                  wrapper={wrapper}
                  idx={idx}
                />
              ))}
              {results.length === 0 && (
                <p className="italic text-muted-foreground font-medium py-1 indent-3">
                  No results found.
                </p>
              )}
            </SearchResultsMenu>
          </>
        ) : (
          <SearchActivator disabled results={results} />
        )}
      </div>
    </div>
  );
};

export default Search;
