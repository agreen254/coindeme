import type { Asset, AssetHistory, AssetValidator } from "@/utils/types";

import { assetValidatorSchema } from "@/validation/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export type AssetStore = {
  assetsNoHistory: Asset[];
  assetsWithHistory: AssetHistory[];
};

export const useAssetStore = create<AssetStore>()(
  persist(
    (_) => ({
      assetsNoHistory: [],
      assetsWithHistory: [],
    }),
    {
      name: "crypto-assets",
    }
  )
);

export const useAddAsset = () => {
  const assets = useAssetStore.getState().assetsNoHistory;
  return (asset: Asset) =>
    useAssetStore.setState({ assetsNoHistory: [...assets, asset] });
};

export const useAddHistoricalData = (asset: AssetHistory) => {
  const assets = useAssetStore.getState().assetsWithHistory;
  return () =>
    useAssetStore.setState({ assetsWithHistory: [...assets, asset] });
};

export function validateAsset(asset: AssetValidator) {
  const validation = assetValidatorSchema.safeParse(asset);
  if (!validation.success) {
    validation.error.errors.forEach((err) => toast.error(err.message));
    return false;
  }

  toast.success("Asset added");
  return true;
}
