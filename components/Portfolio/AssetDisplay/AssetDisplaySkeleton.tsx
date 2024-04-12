import { Asset } from "@/utils/types";

import { extractDate } from "@/utils/extractDate";

import Image from "next/image";

const AssetDisplaySkeleton = ({ asset }: { asset: Asset }) => {
  const { coinName, coinSymbol, coinImage, date } = asset;
  const displayDate = extractDate(date).toLocaleString("en-US", {
    dateStyle: "medium",
  });

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
            <span className="ml-1">-</span>
          </p>
          <p className="text-lg text-muted-foreground/50">
            Purchased {displayDate}
          </p>
        </div>
      </div>
      <div className="w-[916px] rounded-r-xl grid grid-cols-2 p-6 gap-x-6 place-items-center box-border bg-zinc-900/70">
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">-</p>
            <p className="text-muted-foreground">Current Coin Price</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">-</p>
            <p className="text-muted-foreground">Market Cap vs. Volume</p>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">-</p>
            <p className="text-muted-foreground">24h%</p>
          </div>
          <div className="border p-2 space-y-1 rounded-md border-teal-900/50">
            <p className="text-xl">-</p>
            <p className="text-muted-foreground">
              Circulating Supply vs. Max Supply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDisplaySkeleton;
