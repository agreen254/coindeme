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
      queryKey: ["comparison", "chart", id, currency, days],
      queryFn: async (): Promise<ComparisonChartResponse> =>
        await fetch("http://localhost:3000/api/v1/comparison", {
          method: "POST",
          body: JSON.stringify(<ComparisonChartRequest>{
            id: id,
            currency: currency,
            days: days,
          }),
        }).then((res) => res.json()),
      staleTime: Infinity,
    })),
  });
};
