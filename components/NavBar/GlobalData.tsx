"use client";

import { cn } from "@/utils/cn";
import { currencyMap } from "@/utils/maps";
import {
  formatPriceChangePercentage,
  formatPriceValue,
} from "@/utils/formatHelpers";
import { useGlobalData } from "@/hooks/useGlobalData";

import CaretIcon from "@/Icons/Caret";
import ExchangeIcon from "@/Icons/Exchange";
import { HandCoins as HandCoinsIcon } from "lucide-react";
import Image from "next/image";
import NavProgressWidget from "./NavProgressWidget";

const GlobalData = () => {
  const { data, isPending } = useGlobalData();
  const currency = "usd";
  const currencySymbol = currencyMap.get("usd");

  if (isPending || !data)
    return <div className="flex h-[52px] border-y border-white/10"></div>;

  const {
    active_cryptocurrencies: num_active_coins,
    markets: num_markets,
    total_market_cap,
    total_volume,
    market_cap_change_percentage_24h_usd: market_cap_change,
    market_cap_percentage: {
      btc: btc_market_percentage,
      eth: eth_market_percentage,
    },
  } = data;

  return (
    <div className="flex justify-center items-center h-[52px] gap-x-[2%] border-y border-white/10 text-sm">
      <span>
        <HandCoinsIcon className="w-6 h-6 inline" />
        <span className="ml-1 mr-2 font-semibold text-muted-foreground">
          Coins
        </span>
        <span>{num_active_coins}</span>
      </span>
      <span className="w-[1px] h-6 bg-white/10" />
      <span>
        <span>
          <ExchangeIcon className="w-6 h-6 inline" />
        </span>
        <span className="ml-1 mr-2 font-semibold text-muted-foreground">
          Markets
        </span>
        <span>{num_markets}</span>
      </span>
      <span className="w-[1px] h-6 bg-white/10" />
      <span>
        <CaretIcon
          className={cn(
            "w-4 h-4 inline mr-1",
            market_cap_change > 0 && "fill-market-up",
            market_cap_change < 0 && "fill-market-down rotate-180"
          )}
        />
        {currencySymbol + formatPriceValue(total_market_cap[currency])}
      </span>
      <span className="w-[1px] h-6 bg-white/10" />
      <span className="flex items-center">
        {currencySymbol + formatPriceValue(total_volume[currency])}
        <NavProgressWidget
          containerClassName="w-16 ml-2 bg-white/20"
          progressClassName="bg-white"
          progressPercentage={
            total_market_cap[currency] / total_volume[currency]
          }
        />
      </span>
      <span className="w-[1px] h-6 bg-white/10" />
      <span className="flex items-center">
        <Image
          width={25}
          height={25}
          className="-translate-y-[1px] mr-2"
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
          alt="bitcoin logo"
          priority
        />
        {formatPriceChangePercentage(btc_market_percentage)}%
        <NavProgressWidget
          containerClassName="w-16 ml-2 bg-white/20"
          progressClassName="bg-bitcoin"
          progressPercentage={btc_market_percentage}
        />
      </span>
      <span className="w-[1px] h-6 bg-white/10" />
      <span className="flex items-center">
        <Image
          width={25}
          height={25}
          className="-translate-y-[2px] mr-1"
          src="https://assets.coingecko.com/coins/images/279/large/ethereum.png"
          alt="ethereum logo"
          priority
        />
        {formatPriceChangePercentage(eth_market_percentage)}%
        <NavProgressWidget
          containerClassName="w-16 ml-2 bg-white/20"
          progressClassName="bg-eth"
          progressPercentage={eth_market_percentage}
        />
      </span>
    </div>
  );
};

export default GlobalData;
