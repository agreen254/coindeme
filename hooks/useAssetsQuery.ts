import type { AssetStore } from "./useAssetsStore";
import type { AssetHistory, HistoryRequest } from "@/utils/types";

import {
  useQueries,
  UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";

export const useAssetsQuery = (
  store: AssetStore
): UseQueryResult<AssetHistory, Error>[] => {
  return useQueries({
    queries: store.assetsNoHistory.map(
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
          retry: false,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        }
    ),
  });
};
