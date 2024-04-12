import type {
  Asset,
  CoinCurrentQueryUnit,
  CoinHistoryQueryUnit,
  Currency,
} from "@/utils/types";

import { cn } from "@/utils/cn";
import { currencyMap } from "@/utils/maps";
import { extractDate } from "@/utils/extractDate";
import { getAssetDisplayData } from "@/utils/assetListHelpers";
import { useId } from "react";

import { SquarePen as SquarePenIcon } from "lucide-react";
import Image from "next/image";
import { Infinity as InfinityIcon } from "lucide-react";

type Props = {
  asset: Asset;
  currency: Currency;
  currentResponse: CoinCurrentQueryUnit;
  historyResponse: CoinHistoryQueryUnit;
};

const AssetDisplay = ({
  asset,
  currency,
  currentResponse,
  historyResponse,
}: Props) => {
  const editButtonId = useId();

  const { coinName, coinSymbol, coinImage, date } = asset;
  const displayDate = extractDate(date).toLocaleString("en-US", {
    dateStyle: "medium",
  });

  const {
    circVsMaxSupply,
    currentPrice,
    currentPriceChange24h,
    currentValue,
    currentValueChangePercent,
    marketCapVsVolume,
  } = getAssetDisplayData(asset, "usd", currentResponse, historyResponse);

  return (
    <div className="w-[1296px] flex rounded-xl border box-border border-zinc-700/80 shadow-md shadow-zinc-700/30">
      <div className="pl-2 pt-2 pr-4 bg-teal-950/70 rounded-l-xl">
        <Image
          alt={`${coinName} logo`}
          src={coinImage}
          className="inline"
          height={55}
          width={55}
          priority
        />
      </div>
      <div className="relative min-w-[380px] w-[380px] flex flex-col justify-start pb-6 pt-4 gap-y-3 bg-teal-950/70">
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
        <div className="flex flex-col h-full justify-center">
          <p className="text-3xl">
            <span className="font-medium">
              {currencyMap.get(currency)}
              {currentValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="ml-2 text-xl">
              <span
                className={cn(
                  currentValueChangePercent > 0
                    ? "text-market-up"
                    : "text-market-down"
                )}
              >
                ( {currentValueChangePercent > 0 && "+"}
                {currentValueChangePercent.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
                % )
              </span>
            </span>
          </p>
          <p className="text-muted-foreground/50 mb-6">
            Purchased {displayDate}
          </p>
        </div>
      </div>
      <div className="w-[916px] rounded-r-xl grid grid-cols-2 p-6 gap-x-6 place-items-center box-border bg-zinc-900/70">
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">
              {currencyMap.get(currency)}
              {currentPrice < 0.01
                ? currentPrice.toExponential(3)
                : currentPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </p>
            <p className="text-muted-foreground/50">Current Coin Price</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">{marketCapVsVolume}</p>
            <p className="text-muted-foreground/50">Market Cap vs. Volume</p>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">{currentPriceChange24h}%</p>
            <p className="text-muted-foreground/50">24h%</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">
              {circVsMaxSupply || <InfinityIcon className="w-6 h-6 inline" />}
            </p>
            <p className="text-muted-foreground/50">
              Circulating Supply vs. Max Supply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDisplay;
