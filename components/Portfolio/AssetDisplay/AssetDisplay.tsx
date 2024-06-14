import Image from "next/image";
import { FileX2 as DeleteIcon, Infinity as InfinityIcon } from "lucide-react";

import type { Asset, AssetCurrent, AssetHistory } from "@/utils/types";
import CaretIcon from "@/Icons/Caret";
import ProgressWidget from "@/components/ProgressWidget";
import { useDeleteAsset } from "@/hooks/useAssets";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { assetDisplayData } from "@/utils/assetDisplayData";
import { cn } from "@/utils/cn";
import { currencyMap } from "@/utils/maps";
import { extractDate } from "@/utils/dateHelpers";
import { localeFormat } from "@/utils/formatHelpers";

import AssetModalWrapper from "../AssetModal/AssetModalWrapper";

type Props = {
  asset: Asset;
  assetCurrent: AssetCurrent | undefined;
  assetHistory: AssetHistory | undefined;
};

const AssetDisplay = ({ asset, assetCurrent, assetHistory }: Props) => {
  const { coinName, coinSymbol, coinImage, date } = asset;
  const currency = useUserCurrencySetting();
  const deleteAsset = useDeleteAsset(asset.assetId, asset.date);

  const displayDate = extractDate(date).toLocaleString("en-US", {
    dateStyle: "medium",
  });

  const maybeDisplayData = assetDisplayData(
    asset,
    currency,
    assetCurrent,
    assetHistory
  );

  const placeholder = <span className="animate-pulse">--</span>;

  const currentValue = (() => {
    const value = maybeDisplayData?.currentValue;
    return value ? (
      <span>{currencyMap.get(currency) + localeFormat(value)}</span>
    ) : (
      placeholder
    );
  })();

  const currentValueChangePercent = (() => {
    const change = maybeDisplayData?.currentValueChangePercent;
    return change ? (
      <span className={cn(change > 0 ? "text-market-up" : "text-market-down")}>
        ( {change > 0 && "+"}
        {localeFormat(change)}% )
      </span>
    ) : (
      <></>
    );
  })();

  const currentPrice = (() => {
    const price = maybeDisplayData?.currentPrice;
    if (!price) return placeholder;

    return price < 0.01 ? (
      <span>{currencyMap.get(currency) + price.toExponential(2)}</span>
    ) : (
      <span>{currencyMap.get(currency) + localeFormat(price)}</span>
    );
  })();

  const currentPriceChange24h = (() => {
    const change = maybeDisplayData?.currentPriceChange24h;
    if (!change) return placeholder;
    return (
      <>
        <span>
          <CaretIcon
            className={cn(
              "w-4 h-4 mr-1 inline",
              change > 0 ? "fill-market-up" : "fill-market-down rotate-180"
            )}
          />
        </span>
        <span
          className={cn(change > 0 ? "text-market-up" : "text-market-down")}
        >
          {localeFormat(Math.abs(change))}%
        </span>
      </>
    );
  })();

  const marketCapVsVolume = (() => {
    const ratio = maybeDisplayData?.marketCapVsVolume;
    const change = maybeDisplayData?.currentPriceChange24h;

    if (!ratio || !change) return placeholder;
    return (
      <>
        <span
          className={cn(change > 0 ? "text-market-up" : "text-market-down")}
        >
          {Math.round(ratio)}%
        </span>
        <ProgressWidget
          containerClassName={cn(
            "w-full ml-4 mr-2",
            change > 0 ? "bg-market-up/20" : "bg-market-down/20"
          )}
          progressClassName={cn(
            "bg-market-down",
            change > 0 ? "bg-market-up" : "bg-market-down"
          )}
          progressPercentage={ratio}
        />
      </>
    );
  })();

  const circVsTotalSupply = (() => {
    const ratio = maybeDisplayData?.circVsTotalSupply;
    const priceChange = maybeDisplayData?.currentPriceChange24h;

    // The ratio is nullable, so need to distinguish between having actually received null value
    // or the undefined case where no value is received
    if (typeof ratio === "undefined" || typeof priceChange === "undefined") {
      return placeholder;
    }

    const displayNum = ratio ? (
      <span
        className={cn(priceChange > 0 ? "text-market-up" : "text-market-down")}
      >
        {Math.round(ratio)}%
      </span>
    ) : (
      <InfinityIcon className="w-6 h-6 inline" />
    );

    return (
      <>
        {displayNum}
        <ProgressWidget
          containerClassName={cn(
            "w-full ml-4 mr-2",
            priceChange > 0 ? "bg-market-up/20" : "bg-market-down/20"
          )}
          progressClassName={cn(
            "bg-market-down",
            priceChange > 0 ? "bg-market-up" : "bg-market-down"
          )}
          progressPercentage={ratio ?? 100}
        />
      </>
    );
  })();

  return (
    <div className="w-[1296px] flex rounded-xl border box-border dark:border-zinc-700/80 border-zinc-200 shadow-md dark:shadow-zinc-700/30 shadow-zinc-300">
      <div className="pl-2 pt-2 pr-4 dark:bg-teal-950/70 bg-white rounded-l-xl">
        <Image
          alt={`${coinName} logo`}
          src={coinImage}
          className="inline"
          height={55}
          width={55}
          priority
        />
      </div>
      <div className="relative min-w-[380px] w-[380px] flex flex-col justify-start pb-6 pt-4 gap-y-3 dark:bg-teal-950/70 bg-white">
        <AssetModalWrapper role="edit" initialData={asset} />
        <button
          className="absolute top-12 right-4 p-1 rounded-md border-2 border-white/0 focus:outline-none focus:border-stone-500"
          onClick={deleteAsset}
        >
          <DeleteIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          <span
            className={cn("text-3xl", !maybeDisplayData && "animate-pulse")}
          >
            {coinName}
            <span className="text-2xl ml-1 text-muted-foreground font-semibold">
              {coinSymbol}
            </span>
          </span>
        </div>
        <div className="flex flex-col h-full justify-center">
          <p className="text-3xl">
            <span className="font-medium">{currentValue}</span>
            <span className="ml-2 text-xl">{currentValueChangePercent}</span>
          </p>
          <p className="text-muted-foreground/50 mb-6">
            Purchased {displayDate}
          </p>
        </div>
      </div>
      <div className="w-[916px] rounded-r-xl grid grid-cols-2 p-6 gap-x-6 place-items-center box-border dark:bg-zinc-900/70 bg-zinc-50">
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md dark:border-teal-900/50 border-zinc-300">
            <p className="text-xl">{currentPrice}</p>
            <p className="text-sm dark:text-muted-foreground/50 text-muted-foreground">
              Current Coin Price
            </p>
          </div>
          <div className="border p-2 space-y-1 rounded-md dark:border-teal-900/50 border-zinc-300">
            <div className="flex items-center text-xl">{marketCapVsVolume}</div>
            <p className="text-sm dark:text-muted-foreground/50 text-muted-foreground">
              Market Cap vs. Volume
            </p>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md dark:border-teal-900/50 border-zinc-300">
            <p className="text-xl">{currentPriceChange24h}</p>
            <p className="text-sm dark:text-muted-foreground/50 text-muted-foreground">
              24h%
            </p>
          </div>
          <div className="border p-2 space-y-1 rounded-md dark:border-teal-900/50 border-zinc-300">
            <div className="flex items-center text-xl">{circVsTotalSupply}</div>
            <p className="text-sm dark:text-muted-foreground/50 text-muted-foreground">
              Circulating Supply vs. Total Supply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDisplay;
