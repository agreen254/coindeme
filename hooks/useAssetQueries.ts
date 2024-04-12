import type { Asset } from "@/utils/types";
import type {
  AssetCurrent,
  AssetHistory,
  CoinCurrentRequest,
  CoinHistoryRequest,
} from "@/utils/types";

import {
  useQueries,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

export const useAssetHistoryQueries = (
  assets: Asset[]
): UseQueryResult<AssetHistory, Error>[] => {
  return useQueries({
    queries: assets.map(
      (asset) =>
        <UseQueryOptions>{
          queryKey: ["asset", "history", asset.assetId],
          queryFn: async (): Promise<AssetHistory> => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/history`,
              {
                method: "POST",
                body: JSON.stringify(<CoinHistoryRequest>{
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
          retryOnMount: true,
          refetchOnWindowFocus: false,

          // Once the historical data is fetched, never need to refetch it.
          // Must be sure to remove from the cache if user deletes asset.
          gcTime: Infinity,
          staleTime: Infinity,
        }
    ),
  });
};

export const useAssetCurrentQueries = (
  assets: Asset[]
): UseQueryResult<AssetCurrent, Error>[] => {
  return useQueries({
    queries: assets.map(
      (asset) =>
        <UseQueryOptions>{
          queryKey: ["asset", "current", asset.assetId],
          queryFn: async (): Promise<AssetCurrent> => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/current`,
              {
                method: "POST",
                body: JSON.stringify(<CoinCurrentRequest>{
                  assetId: asset.assetId,
                  coinId: asset.coinId,
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
            errorMessage: `Failed to fetch current data for ${asset.coinId}:`,
          },
          retry: false,
          refetchOnMount: false,
          retryOnMount: true,
          refetchOnWindowFocus: false,

          // should refetch current data daily
          staleTime: 1000 * 60 * 60 * 24
        }
    ),
  });
};
