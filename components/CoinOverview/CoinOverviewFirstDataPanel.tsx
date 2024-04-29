"use client";

import { TrendingUp as AllTimeHighIcon } from "lucide-react";
import { TrendingDown as AllTimeLowIcon } from "lucide-react";

import { useCoinQuery } from "@/hooks/useCoinQuery";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { cn } from "@/utils/cn";
import {
  formatPriceChangePercentage as fmtPriceChange,
  formatSmallNum,
  localeFormat,
} from "@/utils/formatHelpers";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";

import CaretIcon from "@/Icons/Caret";
import CoinOverviewPortfolioProfit from "./CoinOverviewPortfolioProfit";
import PortfolioIcon from "@/Icons/Portfolio";
import TanstackPersistProvider from "@/providers/TanstackPersistProvider";

type Props = {
  response: ReturnType<typeof useCoinQuery>;
};

const StackedCaretAndTime = ({ val, time }: { val: number; time: string }) => {
  const iconCn =
    val > 0
      ? "h-5 w-5 mr-2 -mb-2 inline fill-market-up"
      : "h-5 w-5 mr-2 inline fill-market-down rotate-180";
  const timeCn = cn(
    "text-sm font-light",
    val <= 0 && "-mb-2",
    time.length === 3 ? "-translate-x-[1px]" : "translate-x-[1px]" // make sure time is centered above/below caret
  );
  const containerCn =
    val > 0
      ? "flex items-center text-market-up"
      : "flex items-center text-market-down";

  return (
    <div className={containerCn}>
      <div className="flex flex-col">
        {val > 0 ? (
          <>
            <CaretIcon className={iconCn} />
            <span className={timeCn}>{time}</span>
          </>
        ) : (
          <>
            <span className={timeCn}>{time}</span>
            <CaretIcon className={iconCn} />
          </>
        )}
      </div>
      <span className="text-xl">{fmtPriceChange(val)}%</span>
    </div>
  );
};

const CoinOverviewFirstDataPanel = ({ response }: Props) => {
  const currency = useUserCurrencySetting();
  const cSymbol = getCurrencySymbol(currency);
  const data = response.data;
  const fmt = (val: number) =>
    cSymbol + (val < 0.01 ? formatSmallNum(val) : localeFormat(val));

  return (
    <div
      className={cn(
        "min-w-[432px] min-h-[400px] rounded-xl bg-zinc-900/70 border border-zinc-800 p-8 pt-6",
        response.isPending && "animate-pulse"
      )}
    >
      {data &&
        (() => {
          const {
            market_data: {
              current_price,
              price_change_percentage_24h_in_currency: change_24h,
              price_change_percentage_7d_in_currency: change_7d,
              price_change_percentage_30d_in_currency: change_30d,
              ath,
              ath_date,
              atl,
              atl_date,
            },
          } = data;

          const athDate = new Date(ath_date[currency]);
          const athDateString =
            athDate.toLocaleDateString("en-US", { dateStyle: "medium" }) +
            " " +
            athDate.toLocaleTimeString("en-US", { timeStyle: "long" });

          const atlDate = new Date(atl_date[currency]);
          const atlDateString =
            atlDate.toLocaleDateString("en-US", { dateStyle: "medium" }) +
            " " +
            atlDate.toLocaleTimeString("en-US", { timeStyle: "long" });

          return (
            <>
              <p className="font-semibold text-4xl">
                {fmt(current_price[currency])}
              </p>
              <div className="space-x-6 flex justify-between my-2">
                <StackedCaretAndTime val={change_24h[currency]} time="24h" />
                <StackedCaretAndTime val={change_7d[currency]} time="7d" />
                <StackedCaretAndTime val={change_30d[currency]} time="30d" />
              </div>
              <div className="w-full rounded-full h-[1px] my-4 bg-white/35"></div>
              <div className="text-lg">
                <p>
                  <AllTimeHighIcon
                    strokeWidth={1.25}
                    className="w-8 h-8 mr-2 text-market-up inline"
                  />
                  <span className="min-w-[130px] inline-block">
                    All-Time High:
                  </span>
                  <span className="text-xl font-medium">
                    {fmt(ath[currency])}
                  </span>
                </p>
                <p className="indent-10 -mt-1 text-base text-white/50">
                  {athDateString}
                </p>
                <p className="mt-3">
                  <AllTimeLowIcon
                    strokeWidth={1.25}
                    className="w-8 h-8 mr-2 text-market-down inline"
                  />
                  <span className="min-w-[130px] inline-block">
                    All-Time Low:
                  </span>
                  <span className="text-xl font-medium">
                    {fmt(atl[currency])}
                  </span>
                </p>
                <p className="indent-10 -mt-1 text-base text-white/50">
                  {atlDateString}
                </p>
              </div>
              <div className="w-full rounded-full h-[1px] my-4 bg-white/35"></div>
              <div className="w-full flex flex-col items-center">
                <PortfolioIcon className="w-12 h-12 mb-2" />
                <TanstackPersistProvider>
                  <CoinOverviewPortfolioProfit id={response.data.id} />
                </TanstackPersistProvider>
              </div>
            </>
          );
        })()}
    </div>
  );
};

export default CoinOverviewFirstDataPanel;
