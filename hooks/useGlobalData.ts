import type { GlobalResponse } from "@/utils/types";

import { useQuery } from "@tanstack/react-query";

export const useGlobalData = () => {
  return useQuery({
    retry: 0,
    queryKey: ["global"],
    queryFn: async (): Promise<GlobalResponse> => {
      const response = await fetch("http://localhost:3000/api/v1/global");

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }

      return await response.json();
    },
    meta: {
      errorMessage: "Failed to fetch global data:",
    },
  });
};
