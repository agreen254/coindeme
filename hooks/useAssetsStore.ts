import type { AddedAsset, StoredAsset } from "@/utils/types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { addedAssetSchema } from "@/validation/schema";
import toast from "react-hot-toast";

export function validateAsset(asset: AddedAsset) {
  const validation = addedAssetSchema.safeParse(asset);
  if (!validation.success) {
    validation.error.errors.forEach((err) => toast.error(err.message));
    return false;
  }

  toast.success("Asset added");
  return true;
}

const useAssetsStore = create<StoredAsset[]>()(
  persist((_) => [], { name: "crypto-stored-assets" })
);

const useAddAsset = (validatedAsset: AddedAsset) => {
  const storedAssets = useAssetsStore.getState();
   
};
