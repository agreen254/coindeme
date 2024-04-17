import type { Asset, AssetHistory, AssetValidator } from "@/utils/types";

import { assetValidatorSchema } from "@/validation/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export type AssetStore = {
  assets: Asset[];
};

export const useAssetStore = create<AssetStore>()(
  persist(
    (_) => ({
      assets: [],
    }),
    {
      name: "crypto-assets",
    }
  )
);

export const useAddAsset = () => {
  const assets = useAssetStore.getState().assets;
  return (newAsset: Asset) => {
    useAssetStore.setState({
      assets: [
        ...assets.filter(
          (storedAsset) => storedAsset.assetId !== newAsset.assetId
        ),
        newAsset,
      ],
    });
  };
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
