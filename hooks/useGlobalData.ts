import type { GlobalResponseUnwrapped } from "@/utils/types";

import { useQuery } from "@tanstack/react-query";

export const useGlobalData = () => {
  return useQuery({
    retry: 0,
    queryKey: ["global"],
    queryFn: async (): Promise<GlobalResponseUnwrapped> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/global`
      );

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
