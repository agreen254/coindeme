import type { Asset } from "@/utils/types";

import { currencyMap } from "@/utils/maps";
import { useAssetQueries } from "@/hooks/useAssetQueries";

import Image from "next/image";

type Element = ReturnType<typeof useAssetQueries>[number];

type Props = {
  response: Element;
  asset: Asset;
};

const AssetDisplay = ({ response, asset }: Props) => {
  const { coinName, coinSymbol, coinImage, date, value, valueCurrency } = asset;

  if (response.isLoading) return <></>;
  return (
    <div className="w-[1296px] min-h-[224px] flex rounded-xl border border-zinc-700/80 shadow-md shadow-zinc-700/30">
      <div className="w-[432px] min-h-[224px] h-full flex flex-col justify-around p-6 rounded-l-xl bg-teal-950/70">
        <div>
          <Image
            alt={`${coinName} logo`}
            src={coinImage}
            className="inline"
            height={40}
            width={40}
            priority
          />
          <span className="text-3xl ml-2 mr-1">{coinName}</span>
          <span className="text-2xl text-muted-foreground font-semibold">
            {coinSymbol}
          </span>
          <p className="text-3xl indent-[40px]">
            {currencyMap.get(valueCurrency)}
            {value}
          </p>
        </div>
        <div className="text-xl text-muted-foreground/50">Purchased {date}</div>
      </div>
      <div className="w-[864px] h-full rounded-r-xl bg-zinc-900/70"></div>
    </div>
  );
};

export default AssetDisplay;
