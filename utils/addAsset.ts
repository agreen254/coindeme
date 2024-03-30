import type { Asset } from "./types";

import { assetSchema } from "@/validation/schema";
import toast from "react-hot-toast";

export function addAsset(asset: Asset): boolean {
  const validation = assetSchema.safeParse(asset);

  if (!validation.success) {
    const errors = validation.error.errors.map((err) => err.message);
    errors.forEach((err) => toast.error(err));
    return false;
  }

  toast.success("Asset added.");
  return true;
}
