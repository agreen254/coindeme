"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ArrowRightLeft as SwapIcon } from "lucide-react";
import Image from "next/image";

import { convertCoinAmount } from "@/utils/convertCoinAmount";
import { formatPriceValue } from "@/utils/formatHelpers";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { roundDigits } from "@/utils/formatHelpers";
import { cn } from "@/utils/cn";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { useDropdownUnitFromId } from "@/hooks/useDropdownStore";
import { useCoinInfoQuery } from "@/hooks/useCoinInfoQuery";
import type { CoinOverviewResponse } from "@/utils/types";

import ConverterSearchInput from "./ConverterSearchInput";
import Panel from "../Theme/Panel";

type Props = {
  converterKeys: string[];
  coinOneId: string;
  setCoinOneId: Dispatch<SetStateAction<string>>;
  coinTwoId: string;
  setCoinTwoId: Dispatch<SetStateAction<string>>;
  coinOneInfoResponse: ReturnType<typeof useCoinInfoQuery>;
  coinTwoInfoResponse: ReturnType<typeof useCoinInfoQuery>;
};

const Converter = ({
  converterKeys,
  coinOneId,
  setCoinOneId,
  coinTwoId,
  setCoinTwoId,
  coinOneInfoResponse,
  coinTwoInfoResponse,
}: Props) => {
  const currency = useUserCurrencySetting();

  const isFetching =
    coinOneInfoResponse.isFetching || coinTwoInfoResponse.isFetching;

  const [coinOneAmount, setCoinOneAmount] = useState<number>(1);
  const [coinTwoAmount, setCoinTwoAmount] = useState<number>(0);

  const [coinOneIsActive, setCoinOneIsActive] = useState<boolean>(true);
  const [coinTwoIsActive, setCoinTwoIsActive] = useState<boolean>(false);

  const [coinOneQuery, setCoinOneQuery] = useState<string>("Bitcoin");
  const [coinTwoQuery, setCoinTwoQuery] = useState<string>("Ethereum");

  const { isVisible: topMenuIsVisible } = useDropdownUnitFromId(
    converterKeys[0]
  );

  const conversionLabel = (data: CoinOverviewResponse) => {
    return `1 ${data.symbol.toUpperCase()} = ${getCurrencySymbol(
      currency
    )}${formatPriceValue(
      data.market_data.current_price[currency],
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
    if (coinOneInfoResponse.data && coinOneIsActive) {
      setCoinTwoAmount(
        convertCoinAmount(
          coinOneAmount,
          currency,
          coinOneInfoResponse.data,
          coinTwoInfoResponse.data
        )
      );
    }
    if (coinTwoInfoResponse.data && coinTwoIsActive) {
      setCoinOneAmount(
        convertCoinAmount(
          coinTwoAmount,
          currency,
          coinTwoInfoResponse.data,
          coinOneInfoResponse.data
        )
      );
    }
  }, [
    coinOneAmount,
    coinOneIsActive,
    coinTwoAmount,
    coinTwoIsActive,
    setCoinOneAmount,
    setCoinTwoAmount,
    coinOneInfoResponse,
    coinTwoInfoResponse,
  ]);

  return (
    <div className="grid grid-cols-1 screen-xl:grid-cols-2 relative w-[90vw] screen-xl:w-[min(1467px,100vw-4rem)] gap-6">
      <Panel
        className={cn(
          "flex relative flex-col p-4 w-full rounded-lg z-100",
          isFetching && "animate-pulse"
        )}
      >
        <div className="absolute bottom-[40px] h-[1px] w-[calc(100%-2rem)] bg-black/15 dark:bg-white/15"></div>
        <div className="relative flex justify-between items-center">
          {coinOneInfoResponse.data ? (
            <>
              <Image
                className="inline absolute left-2 -translate-y-1"
                width={25}
                height={25}
                src={coinOneInfoResponse.data.image.thumb}
                alt={`${coinOneInfoResponse.data.name} logo`}
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
                className="w-[50%] p-2 pl-0 bg-zinc-50/70 dark:bg-zinc-900/70 text-right font-semibold focus:outline-none focus:border-b focus:border-slice focus:border-grad-l-blue"
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
          {coinOneInfoResponse.data
            ? conversionLabel(coinOneInfoResponse.data)
            : "Loading..."}
        </p>
      </Panel>
      <button
        className={cn(
          "absolute right-[calc(50%-20px)] top-[calc(50%-20px)] rotate-90 screen-xl:rotate-0 z-10 rounded-full p-1 border border-default focus:outline-menu-highlight/70",
          isFetching && "animate-pulse",
          topMenuIsVisible && "-z-10 screen-xl:z-0"
        )}
        onClick={swapPositions}
      >
        <SwapIcon strokeWidth={1} className="h-8 w-8 text-default" />
      </button>
      <Panel
        className={cn(
          "flex relative flex-col p-4 w-full z-1",
          topMenuIsVisible && "z-[-1]",
          isFetching && "animate-pulse"
        )}
      >
        <div className="absolute bottom-[40px] h-[1px] w-[calc(100%-2rem)] bg-black/15 dark:bg-white/15"></div>
        <div className="relative flex justify-between items-center">
          {coinTwoInfoResponse.data ? (
            <>
              <Image
                className="inline absolute left-2 -translate-y-1"
                width={25}
                height={25}
                src={coinTwoInfoResponse.data.image.thumb}
                alt={`${coinTwoInfoResponse.data.name} logo`}
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
                className="w-[50%] p-2 pl-0 bg-zinc-50/70 dark:bg-zinc-900/70 text-right font-semibold focus:outline-none focus:border-b focus:border-slice focus:border-grad-l-blue"
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
          {coinTwoInfoResponse.data
            ? conversionLabel(coinTwoInfoResponse.data)
            : "Loading..."}
        </p>
      </Panel>
    </div>
  );
};

export default Converter;
