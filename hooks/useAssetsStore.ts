import type { AddedAsset } from "@/utils/types";

import { addedAssetSchema } from "@/validation/schema";
import toast from "react-hot-toast";

export function validateAsset(asset: AddedAsset) {
  const validation = addedAssetSchema.safeParse(asset);
  if (!validation.success) {
    validation.error.errors.forEach((err) => toast.error(err.message));
    return false;
  }

  toast.success("Added asset.");
  return true;
}
