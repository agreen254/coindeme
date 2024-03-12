"use client";

import { formatPriceValue } from "@/utils/formatHelpers";
import { useGlobalData } from "@/hooks/useGlobalData";

import ExchangeIcon from "@/Icons/Exchange";
import { HandCoins as HandCoinsIcon } from "lucide-react";
import Image from "next/image";

const GlobalData = () => {
  const { data, isPending } = useGlobalData();

  if (isPending)
    return <div className="flex h-12 border-y border-white/10"></div>;

  return (
    data && (
      <div className="flex justify-center items-center h-12 gap-x-[2%] border-y border-white/10 text-sm">
        <span>
          <HandCoinsIcon className="w-6 h-6 inline" />
          <span className="ml-1 mr-2 font-semibold text-muted-foreground">
            Coins
          </span>
          <span>{data.active_cryptocurrencies}</span>
        </span>
        <span className="w-[1px] h-3 bg-white/10" />
        <span>
          <span>
            <ExchangeIcon className="w-6 h-6 inline" />
          </span>
          <span className="ml-1 mr-2 font-semibold text-muted-foreground">
            Markets
          </span>
          <span>{data.markets}</span>
        </span>
        <span className="w-[1px] h-3 bg-white/10" />
        <span>{formatPriceValue(data.total_market_cap.usd)}</span>
        <span className="w-[1px] h-3 bg-white/10" />
        <span>{formatPriceValue(data.total_volume.usd)}</span>
        <span className="w-[1px] h-3 bg-white/10" />
        <span className="flex">
          <Image
            width={25}
            height={25}
            className="-translate-y-[2px] mr-2"
            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
            alt="bitcoin logo"
            priority
          />
          {data.market_cap_percentage.btc}
        </span>
        <span className="w-[1px] h-3 bg-white/10" />
        <span className="flex">
          <Image
            width={25}
            height={25}
            className="-translate-y-[2px] mr-1"
            src="https://assets.coingecko.com/coins/images/279/large/ethereum.png"
            alt="ethereum logo"
            priority
          />
          {data.market_cap_percentage.eth}
        </span>
      </div>
    )
  );
};

export default GlobalData;
