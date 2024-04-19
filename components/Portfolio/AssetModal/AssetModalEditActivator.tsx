"use client";

import type { Asset } from "@/utils/types";

import { SquarePen as SquarePenIcon } from "lucide-react";

import {
  forwardRef,
  useId,
  type ForwardedRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  defaultAssetModalProps,
  useAssetModalInjectData,
} from "@/hooks/useAssetModal";
import { swapDateApiToInput } from "@/utils/dateHelpers";

type Props = {
  asset: Asset | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AssetModalEditActivator = (
  { asset, isOpen, setIsOpen }: Props,
  editButtonRef: ForwardedRef<HTMLButtonElement>
) => {
  const editButtonId = useId();
  const injectSelectedAssetData = useAssetModalInjectData(
    asset
      ? {
          assetId: asset.assetId,
          coinId: asset.coinId,
          coinQuery: asset.coinName,
          date: swapDateApiToInput(asset.date),
          value: asset.value.toString(),
          valueCurrency: asset.valueCurrency,
        }
      : defaultAssetModalProps
  );

  return (
    <>
      <label htmlFor={editButtonId} className="sr-only">
        edit this asset
      </label>
      <button
        id={editButtonId}
        ref={editButtonRef}
        className="absolute top-3 right-4 p-1 rounded-md border-2 border-white/0 focus:outline-none focus:border-stone-500"
        onClick={() => {
          if (!isOpen) injectSelectedAssetData();
          setIsOpen((prev) => !prev);
        }}
      >
        <SquarePenIcon className="w-6 h-6" />
      </button>
    </>
  );
};

export default forwardRef(AssetModalEditActivator);
