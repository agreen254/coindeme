import type {
  ComparisonChartQueries,
  ComparisonChartRequest,
  ComparisonChartResponse,
} from "@/utils/types";

import { useQueries } from "@tanstack/react-query";

export const useComparisonChartQueries = ({
  ids,
  currency,
  days,
}: ComparisonChartQueries) => {
  return useQueries({
    queries: ids.map((id) => ({
      retry: false,
      staleTime: Infinity,
      queryKey: ["comparison", "chart", id, currency, days],
      queryFn: async (): Promise<ComparisonChartResponse> => {
        const response = await fetch(
          "http://localhost:3000/api/v1/comparison",
          {
            method: "POST",
            body: JSON.stringify(<ComparisonChartRequest>{
              id: id,
              currency: currency,
              days: days,
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
        errorMessage: `Failed to fetch chart data for ${id}:`,
      },
    })),
  });
};
