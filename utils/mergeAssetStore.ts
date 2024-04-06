import type { Asset, AssetHistory } from "./types";
import { useAssetsQuery } from "@/hooks/useAssetsQuery";

type Query = ReturnType<typeof useAssetsQuery>;

/**
 * Method to merge the initially injected asset data with the historical response data.
 */
export function mergeAssetStore(assets: Asset[], query: Query) {
  
}
