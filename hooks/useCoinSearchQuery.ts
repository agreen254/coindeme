import { CoinSearchResponseUnit } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useCoinSearchQuery = (query: string) =>
  useQuery({
    retry: 0,
    queryKey: ["search", query],
    queryFn: async (): Promise<CoinSearchResponseUnit[]> => {
      // do not waste an API call if there is no query
      if (query === "") return [];

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/search`,
        {
          method: "POST",
          body: JSON.stringify({
            query,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }
      return await response.json();
    },
    meta: {
      errorMessage: "Failed to execute the requested search:",
    },
  });
