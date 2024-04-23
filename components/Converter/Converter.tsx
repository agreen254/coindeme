"use client";

import type { MarketElementNoIdx } from "@/utils/types";

import { ArrowRightLeft as SwapIcon } from "lucide-react";
import ConverterSearchInput from "./ConverterSearchInput";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import { cn } from "@/utils/cn";
import { convertCoinAmount } from "@/utils/convertCoinAmount";
import { formatPriceValue } from "@/utils/formatHelpers";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { roundDigits } from "@/utils/formatHelpers";

type Props = {
  converterKeys: string[];
  response: ReturnType<typeof useMarketQuery>;
  coinOneId: string;
  coinTwoId: string;
  coinOneData: MarketElementNoIdx | undefined;
  coinTwoData: MarketElementNoIdx | undefined;
  setCoinOneId: React.Dispatch<React.SetStateAction<string>>;
  setCoinTwoId: React.Dispatch<React.SetStateAction<string>>;
};

const Converter = ({
  converterKeys,
  coinOneId,
  coinTwoId,
  coinOneData,
  coinTwoData,
  setCoinOneId,
  setCoinTwoId,
  response,
}: Props) => {
  const currency = useUserCurrencySetting();

  const [coinOneAmount, setCoinOneAmount] = useState<number>(1);
  const [coinTwoAmount, setCoinTwoAmount] = useState<number>(0);

  const [coinOneIsActive, setCoinOneIsActive] = useState<boolean>(true);
  const [coinTwoIsActive, setCoinTwoIsActive] = useState<boolean>(false);

  const [coinOneQuery, setCoinOneQuery] = useState<string>("Bitcoin");
  const [coinTwoQuery, setCoinTwoQuery] = useState<string>("Ethereum");

  const conversionLabel = (data: MarketElementNoIdx) => {
    return `1 ${data.symbol.toUpperCase()} = ${getCurrencySymbol(
      currency
    )}${formatPriceValue(
      data.current_price,
      2,
      "standard"
    )} ${currency.toUpperCase()}`;
  };

  const swapPositions = () => {
    const [idOne, idTwo] = [coinOneId, coinTwoId];
    const [amountOne, amountTwo] = [coinOneAmount, coinTwoAmount];
    const [queryOne, queryTwo] = [coinOneQuery, coinTwoQuery];

    setCoinOneId(idTwo);
    setCoinOneAmount(amountTwo);

    setCoinTwoId(idOne);
    setCoinTwoAmount(amountOne);

    setCoinOneQuery(queryTwo);
    setCoinTwoQuery(queryOne);
  };

  // effect for implementing the conversion
  useEffect(() => {
    if (response.data && coinOneIsActive) {
      setCoinTwoAmount(
        convertCoinAmount(coinOneAmount, coinOneData, coinTwoData)
      );
    }
    if (response.data && coinTwoIsActive) {
      setCoinOneAmount(
        convertCoinAmount(coinTwoAmount, coinTwoData, coinOneData)
      );
    }
  }, [
    response,
    coinOneAmount,
    coinOneIsActive,
    coinTwoAmount,
    coinTwoIsActive,
    setCoinOneAmount,
    setCoinTwoAmount,
  ]);

  return (
    <div className="flex relative w-[1467px] gap-6">
      <div
        className={cn(
          "flex relative flex-col p-4 w-1/2 bg-zinc-900/70 border border-zinc-800 rounded-lg",
          response.isPending && "animate-pulse"
        )}
      >
        <div className="absolute bottom-[40px] h-[1px] w-[calc(100%-2rem)] bg-white/15"></div>
        <div className="relative flex justify-between items-center">
          {coinOneData ? (
            <>
              <Image
                className="inline absolute left-2 -translate-y-1"
                width={25}
                height={25}
                src={coinOneData.image}
                alt={`${coinOneData.name} logo`}
              />
              <ConverterSearchInput
                dropdownId={converterKeys[0]}
                coinId={coinOneId}
                setCoinId={setCoinOneId}
                query={coinOneQuery}
                setQuery={setCoinOneQuery}
                activeIdHandler={() => {
                  setCoinOneIsActive(true);
                  setCoinTwoIsActive(false);
                }}
              />
              <label htmlFor="coinOneInput" className="sr-only">
                input first coin amount
              </label>
              <input
                placeholder="0"
                id="coinOneInput"
                type="number"
                min={0}
                className="w-[50%] p-2 pl-0 bg-zinc-900/70 text-right font-semibold focus:outline-none focus:border-b focus:border-slice focus:border-grad-l-blue"
                value={roundDigits(coinOneAmount, 5)}
                onChange={(e) => {
                  setCoinTwoIsActive(false);
                  setCoinOneIsActive(true);
                  setCoinOneAmount(parseFloat(e.currentTarget.value || "0"));
                }}
              />
            </>
          ) : (
            <div className="h-[44px]"></div>
          )}
        </div>
        <p className="mt-1 pl-4 text-sm text-muted-foreground">
          {coinOneData ? conversionLabel(coinOneData) : "Loading..."}
        </p>
      </div>
      <button
        className={cn(
          "absolute right-[calc(50%-20px)] top-[calc(50%-20px)] rounded-full p-1 z-10 border border-stone-100 focus:outline-menu-highlight/70",
          response.isPending && "animate-pulse"
        )}
        onClick={swapPositions}
      >
        <SwapIcon strokeWidth={1} className="h-8 w-8 text-stone-100" />
      </button>
      <div
        className={cn(
          "flex relative flex-col p-4 w-1/2 bg-zinc-900/70 border border-zinc-800 rounded-lg",
          response.isPending && "animate-pulse"
        )}
      >
        <div className="absolute bottom-[40px] h-[1px] w-[calc(100%-2rem)] bg-white/15"></div>
        <div className="relative flex justify-between items-center">
          {coinTwoData ? (
            <>
              <Image
                className="inline absolute left-2 -translate-y-1"
                width={25}
                height={25}
                src={coinTwoData.image}
                alt={`${coinTwoData.name} logo`}
              />
              <ConverterSearchInput
                dropdownId={converterKeys[1]}
                coinId={coinTwoId}
                setCoinId={setCoinTwoId}
                query={coinTwoQuery}
                setQuery={setCoinTwoQuery}
                activeIdHandler={() => {
                  setCoinOneIsActive(false);
                  setCoinTwoIsActive(true);
                }}
              />
              <label htmlFor="coinTwoInput" className="sr-only">
                input second coin amount
              </label>
              <input
                placeholder="0"
                id="coinTwoInput"
                type="number"
                min={0}
                className="w-[50%] p-2 pl-0 bg-zinc-900/70 text-right font-semibold focus:outline-none focus:border-b focus:border-slice focus:border-grad-l-blue"
                value={roundDigits(coinTwoAmount, 5)}
                onChange={(e) => {
                  setCoinOneIsActive(false);
                  setCoinTwoIsActive(true);
                  setCoinTwoAmount(parseFloat(e.currentTarget.value || "0"));
                }}
              />
            </>
          ) : (
            <div className="h-[44px]"></div>
          )}
        </div>
        <p className="mt-1 pl-4 text-sm text-muted-foreground">
          {coinTwoData ? conversionLabel(coinTwoData) : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Converter;
