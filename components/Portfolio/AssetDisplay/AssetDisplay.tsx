import type {
  Asset,
  AssetCurrent,
  AssetHistory,
  Currency,
} from "@/utils/types";

import { cn } from "@/utils/cn";
import { currencyMap } from "@/utils/maps";
import { extractDate } from "@/utils/extractDate";
import { assetDisplayData } from "@/utils/assetDisplayData";
import { useId } from "react";

import CaretIcon from "@/Icons/Caret";
import Image from "next/image";
import { Infinity as InfinityIcon } from "lucide-react";
import ProgressWidget from "@/components/ProgressWidget";
import { SquarePen as SquarePenIcon } from "lucide-react";

type Props = {
  asset: Asset;
  assetCurrent: AssetCurrent;
  assetHistory: AssetHistory;
  currency: Currency;
};

// Extend AssetCurrent to include market_cap_change_percentage_24h
const AssetDisplay = ({
  asset,
  currency,
  assetCurrent,
  assetHistory,
}: Props) => {
  const editButtonId = useId();

  const { coinName, coinSymbol, coinImage, date } = asset;
  const displayDate = extractDate(date).toLocaleString("en-US", {
    dateStyle: "medium",
  });

  const {
    circVsTotalSupply,
    currentPrice,
    currentPriceChange24h,
    currentValue,
    currentValueChangePercent,
    marketCapVsVolume,
  } = assetDisplayData(asset, "usd", assetCurrent, assetHistory);

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
                ? currentPrice.toExponential(2)
                : currentPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </p>
            <p className="text-sm text-muted-foreground/50">
              Current Coin Price
            </p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <div className="flex items-center text-xl">
              <span>{Math.round(marketCapVsVolume) + "%"}</span>
              <ProgressWidget
                containerClassName="w-full ml-4 mr-2 bg-white/20"
                progressClassName="bg-white/80"
                progressPercentage={marketCapVsVolume}
              />
            </div>
            <p className="text-sm text-muted-foreground/50">
              Market Cap vs. Volume
            </p>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p
              className={cn(
                "text-xl",
                currentPriceChange24h > 0
                  ? "text-market-up"
                  : "text-market-down"
              )}
            >
              <span>
                <CaretIcon
                  className={cn(
                    "w-4 h-4 mr-1 inline",
                    currentPriceChange24h > 0
                      ? "fill-market-up"
                      : "fill-market-down rotate-180"
                  )}
                />
              </span>
              <span>
                {Math.abs(currentPriceChange24h).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </span>
            </p>
            <p className="text-sm text-muted-foreground/50">24h%</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <div className="flex items-center text-xl">
              <span>
                {circVsTotalSupply ? (
                  Math.round(circVsTotalSupply) + "%"
                ) : (
                  <InfinityIcon className="w-6 h-6 inline" />
                )}
              </span>
              <ProgressWidget
                containerClassName="w-full ml-4 mr-2 bg-white/20"
                progressClassName="bg-white/80"
                progressPercentage={circVsTotalSupply ?? 100}
              />
            </div>
            <p className="text-sm text-muted-foreground/50">
              Circulating Supply vs. Total Supply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDisplay;
