"use client";

import {
  useAssetCurrentQueries,
  useAssetHistoryQueries,
} from "@/hooks/useAssetQueries";
import { useAssetStore } from "@/hooks/useAssets";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import CaretIcon from "@/Icons/Caret";

type Props = {
  id: string | undefined;
};

const CoinOverviewPortfolioProfit = ({ id }: Props) => {
  const assets = useAssetStore().assets.filter((asset) => asset.coinId === id);
  const assetsPast = useAssetHistoryQueries(assets);
  const assetsCurrent = useAssetCurrentQueries(assets);
  const currency = useUserCurrencySetting();

  const hasData =
    assetsPast.every((res) => res.data !== undefined) &&
    assetsCurrent.every((res) => res.data !== undefined);

  const profit = (() => {
    if (assets.length === 0) return "No Assets Found";
    if (hasData) {
      const profit = assets.reduce((value, asset, idx) => {
        const pastCoinValue = assetsPast[idx].data.current_price[currency];
        const currentCoinValue =
          assetsCurrent[idx].data.current_price[currency];
        const numCoins =
          asset.value / assetsPast[idx].data.current_price[asset.valueCurrency];

        const pastValue = numCoins * pastCoinValue;
        const currentValue = numCoins * currentCoinValue;
        return value + (currentValue - pastValue);
      }, 0);
      return profit > 0 ? (
        <span className="text-market-up">
          <CaretIcon className="w-3 h-3 mr-1 -translate-y-[2px] inline fill-market-up" />
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(profit)}
        </span>
      ) : (
        <span className="text-market-down">
          <CaretIcon className="w-3 h-3 mr-1 rotate-180 -translate-y-[2px] inline fill-market-down" />
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(profit)}
        </span>
      );
    }
    return "Loading...";
  })();

  return (
    <p>
      <span className="text-muted-foreground mr-2">Portfolio Profit: </span>
      <span className="text-xl">{profit}</span>
    </p>
  );
};

export default CoinOverviewPortfolioProfit;
