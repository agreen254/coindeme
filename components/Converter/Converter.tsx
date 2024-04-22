"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowRightLeft as SwitchIcon } from "lucide-react";
import ConverterSearchInput from "./ConverterSearchInput";
import Image from "next/image";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { convertCoinAmount } from "@/utils/convertCoinAmount";
import { flatMarketRes } from "@/utils/flatMarketRes";
import { formatPriceValue } from "@/utils/formatHelpers";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { useMarketQuery } from "@/hooks/useMarketQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

type Props = {
  converterKeys: string[];
};

const Converter = ({ converterKeys }: Props) => {
  const currency = useUserCurrencySetting();
  const response = useMarketQuery(currency, "market_cap", "desc");

  const [coinOneId, setCoinOneId] = useState<string>("bitcoin");
  const [coinOneAmount, setCoinOneAmount] = useState<number>(0);
  const [coinOneQuery, setCoinOneQuery] = useState<string>("Bitcoin");
  const coinOneData = flatMarketRes(response.data?.pages)?.find(
    (coin) => coin.id === coinOneId
  );

  const [coinTwoId, setCoinTwoId] = useState<string>("ethereum");
  const [coinTwoAmount, setCoinTwoAmount] = useState<number>(0);
  const [coinTwoQuery, setCoinTwoQuery] = useState<string>("Ethereum");
  const coinTwoData = flatMarketRes(response.data?.pages)?.find(
    (coin) => coin.id === coinTwoId
  );

  const [coinOneInputIsActive, setCoinOneInputIsActive] =
    useState<boolean>(false);
  const [coinTwoInputIsActive, setCoinTwoInputIsActive] =
    useState<boolean>(false);

  useEffect(() => {
    if (response.data && coinOneInputIsActive) {
      setCoinTwoAmount(
        convertCoinAmount(coinOneAmount, coinOneData, coinTwoData)
      );
    }

    if (response.data && coinTwoInputIsActive) {
      setCoinOneAmount(
        convertCoinAmount(coinTwoAmount, coinTwoData, coinOneData)
      );
    }
  }, [
    response,
    coinOneAmount,
    coinTwoAmount,
    setCoinOneAmount,
    setCoinTwoAmount,
  ]);

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

  return (
    <div className="flex relative w-[1467px] gap-6">
      <div
        className={cn(
          "flex relative flex-col p-4 w-1/2 bg-zinc-900/70 border border-zinc-800 rounded-lg",
          response.isLoading && "animate-pulse"
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
              />
              <input
                placeholder="0"
                type="number"
                min={0}
                className="w-[50%] p-2 pl-0 bg-zinc-900/70 text-right font-semibold focus:outline-none focus:border-b focus:border-slice focus:border-grad-l-blue"
                value={coinOneAmount}
                onChange={(e) => {
                  setCoinTwoInputIsActive(false);
                  setCoinOneInputIsActive(true);
                  setCoinOneAmount(parseFloat(e.currentTarget.value || "0"));
                }}
              />
            </>
          ) : (
            <div className="h-[44px]"></div>
          )}
        </div>
        <p className="mt-1 pl-4 text-sm text-muted-foreground">
          {coinOneData
            ? `1 ${coinOneData.symbol.toUpperCase()} = ${getCurrencySymbol(
                currency
              )}${formatPriceValue(
                coinOneData.current_price,
                2,
                "standard"
              )} ${currency.toUpperCase()}`
            : "Loading..."}
        </p>
      </div>
      {response.data && (
        <AnimatePresence key="converterSwapButton">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeIn", duration: 0.2 }}
            className="absolute right-[calc(50%-20px)] top-[calc(50%-20px)] rounded-full p-1 z-10 border border-stone-100 focus:outline-menu-highlight/70"
            onClick={swapPositions}
          >
            <SwitchIcon strokeWidth={1} className="h-8 w-8 text-stone-100" />
          </motion.button>
        </AnimatePresence>
      )}
      <div
        className={cn(
          "flex relative flex-col p-4 w-1/2 bg-zinc-900/70 border border-zinc-800 rounded-lg",
          response.isFetching && "animate-pulse"
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
              />
              <input
                placeholder="0"
                type="number"
                min={0}
                className="w-[50%] p-2 pl-0 bg-zinc-900/70 text-right font-semibold focus:outline-none focus:border-b focus:border-slice focus:border-grad-l-blue"
                // https://github.com/facebook/react/issues/9402#issuecomment-447891987
                value={coinTwoAmount}
                onChange={(e) => {
                  setCoinOneInputIsActive(false);
                  setCoinTwoInputIsActive(true);
                  setCoinTwoAmount(parseFloat(e.currentTarget.value || "0"));
                }}
              />
            </>
          ) : (
            <div className="h-[44px]"></div>
          )}
        </div>
        <p className="mt-1 pl-4 text-sm text-muted-foreground">
          {coinTwoData
            ? `1 ${coinTwoData.symbol.toUpperCase()} = ${getCurrencySymbol(
                currency
              )}${formatPriceValue(
                coinTwoData.current_price,
                2,
                "standard"
              )} ${currency.toUpperCase()}`
            : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Converter;
