import type { AddedAsset, StoredAsset } from "@/utils/types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { addedAssetSchema } from "@/validation/schema";
import toast from "react-hot-toast";

type AssetsState = {
  storedAssetsNoHistoricalData: AddedAsset[];
  storedAssetsWithHistoricalData: StoredAsset[];
};

export function validateAsset(asset: AddedAsset) {
  const validation = addedAssetSchema.safeParse(asset);
  if (!validation.success) {
    validation.error.errors.forEach((err) => toast.error(err.message));
    return false;
  }

  toast.success("Asset added");
  return true;
}

export const useAssetsStore = create<AssetsState>()(
  persist(
    (_) => ({
      storedAssetsNoHistoricalData: [],
      storedAssetsWithHistoricalData: [],
    }),
    { name: "crypto-stored-assets" }
  )
);

export const addNewAsset = (asset: AddedAsset) => {
  const currentAssets = useAssetsStore.getState().storedAssetsNoHistoricalData;
  useAssetsStore.setState({
    storedAssetsNoHistoricalData: [...currentAssets, asset],
  });
};
