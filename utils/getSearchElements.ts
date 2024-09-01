import type {
  MarketResponse,
  MarketResponsePaginated,
  SearchTargets,
  SearchResultWrapper,
} from "./types";

import fuzzysort from "fuzzysort";

export function getSearchTargets(data: MarketResponsePaginated[] | undefined) {
  return data?.reduce((res: SearchTargets, current) => {
    return [...res, ...parseOnePage(current.market)];
  }, []);
}

export function parseOnePage(data: MarketResponse) {
  return data.reduce((res: SearchTargets, mkt) => {
    return [
      ...res,
      { name: mkt.name, symbol: mkt.symbol.toUpperCase(), id: mkt.id },
    ];
  }, []);
}

/**
 * You can't just use the library's multi-key sorting functionality because there's no way to tell which key got the highest score.
 * This method renders both the coin name and symbol, and it will only highlight the best match, i.e. the name for a name match and symbol for symbol match.
 * https://github.com/farzher/fuzzysort?tab=readme-ov-file#advanced-usage
 *
 * The method uses flatMap so any null trash left over from invalid matches can be removed right away.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#for_adding_and_removing_items_during_a_map
 */
export function getSearchResults(
  targets: SearchTargets | undefined,
  searchText: string
): SearchResultWrapper[] {
  if (!targets) return [];

  return targets.flatMap((target) => {
    // specify a fallback score if no match is found that is impossibly low;
    // this way we know it needs to be excluded.
    const nameRes = fuzzysort.single(searchText, target.name) ?? {
      score: -100000,
      target: target.name,
      id: target.id,
    };
    const symbolRes = fuzzysort.single(searchText, target.symbol) ?? {
      score: -100000,
      target: target.symbol,
      id: target.id,
    };

    // no matches found, when [] is flattened it is removed from the results array
    if (nameRes.score === -100000 && symbolRes.score === -100000) return [];
    return nameRes.score > symbolRes.score
      ? [
          {
            result: nameRes,
            kind: "name" as SearchResultWrapper["kind"],
            otherText: target.symbol,
            id: target.id,
          },
        ]
      : [
          {
            result: symbolRes,
            kind: "symbol" as SearchResultWrapper["kind"],
            otherText: target.name,
            id: target.id,
          },
        ];
  });
}

export function processSearch(
  toSearch: MarketResponsePaginated[] | undefined,
  searchQuery: string
) {
  const searchTargets = getSearchTargets(toSearch);
  const searchResults = getSearchResults(searchTargets, searchQuery);
  const numResults = searchResults.length;

  return {
    searchTargets,
    searchResults,
    numResults,
  };
}

/**
 * Normalize the selected index to 0 if it is -1 and retrieve corresponding id from the results array.
 *
 * The selected index will be -1 if user focuses on the activator and does not use the arrow keys or mouse
 * to highlight anything from the results list.
 *
 * This is important becaues pressing enter when the selected index is -1 should trigger behavior on the first result.
 */
export function getAdjustedIdxAndId(
  selectedIndex: number,
  searchResults: SearchResultWrapper[]
) {
  const adjustedIndex = selectedIndex === -1 ? 0 : selectedIndex;
  const adjustedId = searchResults[adjustedIndex].id;
  return { adjustedId, adjustedIndex };
}
