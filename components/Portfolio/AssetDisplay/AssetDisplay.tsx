import type { Asset } from "@/utils/types";

import { currencyMap } from "@/utils/maps";
import { extractDate } from "@/utils/extractDate";
import { getAssetDisplays } from "@/utils/assetDisplayHelpers";
import { useAssetQueries } from "@/hooks/useAssetQueries";
import { useId } from "react";
import { useMarketQuery } from "@/hooks/useMarketQuery";

import { SquarePen as SquarePenIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  historyResponse: ReturnType<typeof useAssetQueries>[number];
  marketResponse: ReturnType<typeof useMarketQuery>;
  asset: Asset;
};

const AssetDisplay = ({ historyResponse, marketResponse, asset }: Props) => {
  const editButtonId = useId();

  const {
    coinName,
    coinSymbol,
    coinImage,
    date: _date,
    valueCurrency,
  } = asset;
  const date = extractDate(_date);

  const {
    circulatingVsMaxSupply,
    currentAssetChangePercent,
    currentAssetValue,
    currentCoinPrice,
    marketCapVsVolume,
    twentyFourPercent,
  } = getAssetDisplays({ asset, historyResponse, marketResponse });

  return (
    <div className="w-[1296px] flex rounded-xl border box-border border-zinc-700/80 shadow-md shadow-zinc-700/30">
      <div className="pl-5 pt-6 pr-2 bg-teal-950/70 rounded-l-xl">
        <Image
          alt={`${coinName} logo`}
          src={coinImage}
          className="inline"
          height={55}
          width={55}
          priority
        />
      </div>
      <div className="relative w-[380px] flex flex-col justify-start pb-6 pt-8 gap-y-3 bg-teal-950/70">
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
          <p className="text-4xl mb-3">
            <span>
              {currencyMap.get(valueCurrency)}
              {currentAssetValue}
            </span>
            <span className="ml-1">{currentAssetChangePercent}</span>
          </p>
          <p className="text-lg text-muted-foreground/50">
            Purchased {date.toLocaleString("en-US", { dateStyle: "medium" })}
          </p>
        </div>
      </div>
      <div className="w-[916px] rounded-r-xl grid grid-cols-2 p-6 gap-x-6 place-items-center box-border bg-zinc-900/70">
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">{currentCoinPrice}</p>
            <p className="text-muted-foreground">Current Coin Price</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">{marketCapVsVolume}</p>
            <p className="text-muted-foreground">Market Cap vs. Volume</p>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">{twentyFourPercent}</p>
            <p className="text-muted-foreground">24h%</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">{circulatingVsMaxSupply}</p>
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
