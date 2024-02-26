import type { ComparisonChartRequest } from "@/utils/types";

import { useQuery } from "@tanstack/react-query";

export const useComparisonChartQuery = ({
  id,
  currency,
  days,
}: ComparisonChartRequest) => {
  return useQuery({
    queryKey: ["comparison", "chart", id, currency, days],
    queryFn: async () =>
      await fetch("http://localhost:3000/api/v1/comparison", {
        method: "POST",
        body: JSON.stringify(<ComparisonChartRequest>{
          id: id,
          currency: currency,
          days: days,
        }),
      }).then((res) => res.json()),
  });
};
