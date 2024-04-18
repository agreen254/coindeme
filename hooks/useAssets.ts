import type { Asset, AssetValidator } from "@/utils/types";

import { useQueryClient } from "@tanstack/react-query";
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

export const useDeleteAsset = (deleteId: string, deleteDate: string) => {
  const queryClient = useQueryClient();
  return () => {
    useAssetStore.setState((prev) => ({
      assets: prev.assets.filter((asset) => asset.assetId !== deleteId),
    }));

    // clear asset data from the cache so it doesn't persist forever
    queryClient.removeQueries({
      queryKey: ["asset", "history", deleteId, deleteDate],
      exact: true,
    });
    queryClient.removeQueries({
      queryKey: ["asset", "current", deleteId],
      exact: true,
    });

    toast.success("Asset deleted");
  };
};

export const useUpdateAssets = () => {
  const assets = useAssetStore.getState().assets;
  return (newAsset: Asset, editing: boolean) => {
    useAssetStore.setState({
      assets: [
        ...assets.filter(
          (storedAsset) => storedAsset.assetId !== newAsset.assetId
        ),
        newAsset,
      ],
    });
    editing ? toast.success("Asset edited") : toast.success("Asset added");
  };
};

export function validateAsset(asset: AssetValidator) {
  const validation = assetValidatorSchema.safeParse(asset);
  if (!validation.success) {
    validation.error.errors.forEach((err) => toast.error(err.message));
    return false;
  }
  return true;
}
