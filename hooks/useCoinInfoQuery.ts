import type { CoinOverviewResponse } from "@/utils/types";

import { useQuery } from "@tanstack/react-query";

export const useCoinInfoQuery = (id: string) => {
  return useQuery({
    queryKey: ["overview", id],
    queryFn: async (): Promise<CoinOverviewResponse> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/coin`,
        {
          method: "POST",
          body: JSON.stringify({
            id: id,
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
      errorMessage: "Failed to fetch coin overview data:",
    },
  });
};
