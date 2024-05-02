import { SearchItem, SearchRequest } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useSearchInputQuery = (query: string) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: async (): Promise<SearchItem[]> => {
      if (query === "") return [];

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/search`,
        {
          method: "POST",
          body: JSON.stringify(<SearchRequest>{ query: query }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }

      return await response.json();
    },
    meta: {
      errorMessage: "Search failed: ",
    },
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
