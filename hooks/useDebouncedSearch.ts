import { useDebounce } from "@uidotdev/usehooks";
import { getSearchResults } from "@/utils/getSearchElements";
import { useCoinSearchQuery } from "./useCoinSearchQuery";

export const useDebouncedSearch = (
  query: string,
  delay: number = 600, // ms
  maxNumResults: number = 15
) => {
  const debouncedQuery = useDebounce(query, delay);
  const targetQuery = useCoinSearchQuery(debouncedQuery);

  const searchTargets = targetQuery.data;
  const searchResults = getSearchResults(searchTargets, debouncedQuery).slice(
    0,
    maxNumResults
  );
  const numResults = searchResults.length;

  const isLoading = !debouncedQuery || targetQuery.isLoading;
  const noResults =
    debouncedQuery !== "" &&
    searchResults.length === 0 &&
    !targetQuery.isLoading;

  return {
    searchTargets,
    searchResults,
    numResults,
    noResults,
    isLoading,
  };
};
