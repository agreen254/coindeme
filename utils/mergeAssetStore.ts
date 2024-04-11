import type { Asset, AssetHistory } from "./types";
import { useAssetHistoryQueries } from "@/hooks/useAssetQueries";

type Query = ReturnType<typeof useAssetHistoryQueries>;

/**
 * Method to merge the initially injected asset data with the historical response data.
 */
export function mergeAssetStore(assets: Asset[], query: Query) {
  
}
