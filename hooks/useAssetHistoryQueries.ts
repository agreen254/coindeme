import type { HistoricalRequest, HistoricalResponse } from "@/utils/types";

import { useAssetsStore } from "./useAssetsStore";
import { useQuery, useQueries } from "@tanstack/react-query";

/**
 * Hook responsible for retrieving historical data when the user adds an asset.
 *
 * The user first submits a new asset to add; this does not contain the historical data.
 *
 * Because of limited API calls, historical data needs to be cached.
 *
 * The query function will check the store to see if historical data has already been fetched;
 * if so, it will just return the data from the store and not use another API call.
 */
export const useAssetHistoryQueries = () => {
  const assets = useAssetsStore();
  return useQueries({
    queries: assets.storedAssetsNoHistoricalData.map((asset) => ({
      queryKey: ["asset", asset.assetId],
      queryFn: async (): Promise<HistoricalResponse> => {
        const formattedDate = asset.date
          .toLocaleDateString("en-GB")
          .replaceAll("/", "-");

        const storedData = assets.storedAssetsWithHistoricalData.find(
          (histAsset) => histAsset.assetId === asset.assetId
        );
        if (storedData) return storedData;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/historical`,
          {
            method: "POST",
            body: JSON.stringify(<HistoricalRequest>{
              date: formattedDate,
              id: asset.coinId,
            }),
          }
        );

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message);
        }
        return await response.json();
      },
      retry: false,
      meta: {
        errorMessage: `Failed to fetch ${asset.coinId} ${asset.date}:`,
      },
    })),
  });
};
