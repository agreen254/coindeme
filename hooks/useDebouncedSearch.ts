import { useDebounce } from "@uidotdev/usehooks";
import { getSearchResults } from "@/utils/getSearchElements";
import { useCoinSearchQuery } from "./useCoinSearchQuery";

export const useDebouncedSearch = (
  query: string,
  delay: number = 600,
  maxNumResults: number = 15
) => {
  const debouncedQuery = useDebounce(query, delay);

  const targetQuery = useCoinSearchQuery(debouncedQuery);
  const targets = targetQuery.data;
  const results = getSearchResults(targets, debouncedQuery);

  const truncatedResults = results.slice(0, maxNumResults);
  const numResults = truncatedResults.length;

  return {
    searchTargets: targets,
    searchResults: truncatedResults,
    numResults: numResults,
  };
};
