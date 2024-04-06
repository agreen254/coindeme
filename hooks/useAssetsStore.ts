import type { AddedAsset } from "@/utils/types";

import { addedAssetSchema } from "@/validation/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

type AssetStore = {
  
}

export const createAssetStore = create<>()(persist((set) => ({})));

export function validateAsset(asset: AddedAsset) {
  const validation = addedAssetSchema.safeParse(asset);
  if (!validation.success) {
    validation.error.errors.forEach((err) => toast.error(err.message));
    return false;
  }

  toast.success("Asset added");
  return true;
}
