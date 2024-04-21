"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowRightLeft as SwitchIcon } from "lucide-react";
import ConverterAmountInput from "./ConverterAmountInput";
import ConverterSearchInput from "./ConverterSearchInput";
import Image from "next/image";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
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

  const [idOne, setIdOne] = useState<string>("bitcoin");
  const [amountOne, setAmountOne] = useState<number>(0);
  const coinOne = flatMarketRes(response.data?.pages)?.find(
    (coin) => coin.id === idOne
  );

  const [idTwo, setIdTwo] = useState<string>("ethereum");
  const [amountTwo, setAmountTwo] = useState<number>(0);
  const coinTwo = flatMarketRes(response.data?.pages)?.find(
    (coin) => coin.id === idTwo
  );

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
          {coinOne ? (
            <>
              <Image
                className="inline absolute left-2 -translate-y-1"
                width={25}
                height={25}
                src={coinOne.image}
                alt={`${coinOne.name} logo`}
              />
              <ConverterSearchInput
                dropdownId={converterKeys[0]}
                coinId={idOne}
                setCoinId={setIdOne}
              />
              <ConverterAmountInput
                amount={amountOne}
                setAmount={setAmountOne}
              />
            </>
          ) : (
            <div className="h-[44px]"></div>
          )}
        </div>
        <p className="mt-1 pl-4 text-sm text-muted-foreground">
          {coinOne
            ? `1 ${coinOne.symbol.toUpperCase()} = ${getCurrencySymbol(
                currency
              )}${formatPriceValue(
                coinOne.current_price
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
            className="absolute right-[calc(50%-20px)] top-[calc(50%-20px)] rounded-full p-1 z-10 border border-stone-100"
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
          {coinTwo ? (
            <>
              <Image
                className="inline absolute left-2 -translate-y-1"
                width={25}
                height={25}
                src={coinTwo.image}
                alt={`${coinTwo.name} logo`}
              />
              <ConverterSearchInput
                dropdownId={converterKeys[1]}
                coinId={idTwo}
                setCoinId={setIdTwo}
              />
              <ConverterAmountInput
                amount={amountTwo}
                setAmount={setAmountTwo}
              />
            </>
          ) : (
            <div className="h-[44px]"></div>
          )}
        </div>
        <p className="mt-1 pl-4 text-sm text-muted-foreground">
          {coinTwo
            ? `1 ${coinTwo.symbol.toUpperCase()} = ${getCurrencySymbol(
                currency
              )}${formatPriceValue(
                coinTwo.current_price
              )} ${currency.toUpperCase()}`
            : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Converter;
