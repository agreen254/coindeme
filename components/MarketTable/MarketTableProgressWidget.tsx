"use client";

import { cn } from "@/utils/cn";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import { Circle as CircleIcon, Infinity as InfinityIcon } from "lucide-react";

type Props = {
  rightNumber: number | null;
  leftNumber: number | null;
  isGaining: boolean;
};

const MarketTableProgressWidget = ({
  leftNumber,
  rightNumber,
  isGaining,
}: Props) => {
  const currency = useUserCurrencySetting();

  const percentFull = () => {
    if (leftNumber && rightNumber) {
      return leftNumber / rightNumber;
    } else return 0;
  };

  const formatNumber = (n: number | null) => {
    return n ? (
      getCurrencySymbol(currency) +
        Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(n)
    ) : (
      <InfinityIcon className="w-4 h-4 inline" />
    );
  };

  return (
    <div className="flex flex-col justify-center items-start">
      <div className="w-[80%] px-2 flex justify-between text-sm">
        <span>
          <CircleIcon
            className={cn(
              "h-[6px] w-[6px] mr-2 inline",
              isGaining
                ? "fill-market-teal text-market-teal"
                : "fill-market-down text-market-down"
            )}
          />
          <span className="font-mono">{formatNumber(leftNumber)}</span>
        </span>
        <span>
          <CircleIcon className="h-[6px] w-[6px] mr-2 fill-paynes-gray text-paynes-gray inline" />
          <span className="font-mono">{formatNumber(rightNumber)}</span>
        </span>
      </div>
      <div className="rounded-[3px] w-56 h-[6px] dark:bg-paynes-gray bg-black/15">
        <div
          className={cn(
            "rounded-[3px] w-full h-[6px]",
            isGaining ? "bg-market-teal" : "bg-market-down"
          )}
          style={{
            width: `min(calc(100% * ${
              percentFull() < 0.02 ? 0.02 : percentFull()
            }), 100%)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MarketTableProgressWidget;
