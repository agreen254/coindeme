"use client";

import { cn } from "@/utils/cn";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { useAverageColorQuery } from "@/hooks/useAverageColorQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

import { Circle as CircleIcon, Infinity as InfinityIcon } from "lucide-react";

type Props = {
  rightNumber: number | null;
  leftNumber: number | null;
  isGaining: boolean;
  colorUrl?: string;
};

const MarketTableProgressWidget = ({
  leftNumber,
  rightNumber,
  isGaining,
  colorUrl,
}: Props) => {
  const currency = useUserCurrencySetting();
  const colorQuery = useAverageColorQuery(
    colorUrl ||
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
  );
  const color = colorQuery?.data?.hex || "#FFF";

  const fillRatio = (() => {
    if (leftNumber && rightNumber) {
      return leftNumber / rightNumber;
    } else return 0;
  })();

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
            style={{ fill: color, color: color }}
            className={cn(
              "h-[6px] w-[6px] mr-2 inline",
              isGaining && !color
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
      <div className="rounded-[2px] w-56 h-[6px] bg-paynes-gray">
        <div
          className={cn(
            "rounded-[2px] w-full h-[6px]",
            fillRatio < 0.99 && "border-r border-stone-200",
            isGaining && !color ? "bg-market-teal" : "bg-market-down"
          )}
          style={{
            width: `min(calc(100% * ${
              fillRatio < 0.02 ? 0.02 : fillRatio
            }), 100%)`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MarketTableProgressWidget;
