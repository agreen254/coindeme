import type { Asset } from "@/utils/types";

import { currencyMap } from "@/utils/maps";
import { useAssetQueries } from "@/hooks/useAssetQueries";
import { useId } from "react";

import { SquarePen as SquarePenIcon } from "lucide-react";
import Image from "next/image";

type Element = ReturnType<typeof useAssetQueries>[number];

type Props = {
  response: Element;
  asset: Asset;
};

const AssetDisplay = ({ response, asset }: Props) => {
  const { coinName, coinSymbol, coinImage, date, value, valueCurrency } = asset;
  const editButtonId = useId();

  if (response.isLoading) return <></>;
  return (
    <div className="w-[1296px] flex rounded-xl border box-border border-zinc-700/80 shadow-md shadow-zinc-700/30">
      <div className="p-4 pr-2 bg-teal-950/70 rounded-l-xl">
        <Image
          alt={`${coinName} logo`}
          src={coinImage}
          className="inline"
          height={60}
          width={60}
          priority
        />
      </div>
      <div className="relative w-[380px] flex flex-col justify-around py-6 gap-y-3 bg-teal-950/70">
        <label htmlFor={editButtonId} className="sr-only">
          edit this asset
        </label>
        <button id={editButtonId} className="absolute top-3 right-4">
          <SquarePenIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          <span className="text-3xl">
            {coinName}
            <span className="text-2xl ml-1 text-muted-foreground font-semibold">
              {coinSymbol}
            </span>
          </span>
        </div>
        <div>
          <p className="text-3xl">
            <span>
              {currencyMap.get(valueCurrency)}
              {value}
            </span>
            <span>{/* caret icon with percentage change */}</span>
          </p>
          <p className="text-lg text-muted-foreground/50">Purchased {date}</p>
        </div>
      </div>
      <div className="w-[916px] rounded-r-xl grid grid-cols-2 p-6 gap-x-6 place-items-center box-border bg-zinc-900/70 text-sm">
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">$800</p>
            <p className="text-muted-foreground">Current Price</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">44%</p>
            <p className="text-muted-foreground">Market Cap vs. Volume</p>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">5%</p>
            <p className="text-muted-foreground">24h%</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">10%</p>
            <p className="text-muted-foreground">
              Circulating Supply vs. Max Supply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDisplay;
