import type { Asset } from "@/utils/types";
import type { AssetHistory, HistoryRequest } from "@/utils/types";

import {
  useQueries,
  UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";

export const useAssetQueries = (
  assets: Asset[]
): UseQueryResult<AssetHistory, Error>[] => {
  return useQueries({
    queries: assets.map(
      (asset) =>
        <UseQueryOptions>{
          queryKey: ["asset", asset.assetId],
          queryFn: async (): Promise<AssetHistory> => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/history`,
              {
                method: "POST",
                body: JSON.stringify(<HistoryRequest>{
                  assetId: asset.assetId,
                  coinId: asset.coinId,
                  date: asset.date,
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
            errorMessage: `Failed to fetch ${asset.coinId} ${asset.date}:`,
          },
          retry: true,
          refetchOnMount: false,
          retryOnMount: true,
          refetchOnWindowFocus: false,
          retryDelay: (attempt) =>
            Math.min(attempt > 1 ? 2 ** (attempt * 1000) : 1000, 30 * 1000), // exponential backoff
        }
    ),
  });
};
