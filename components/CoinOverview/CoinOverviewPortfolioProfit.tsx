"use client";

import {
  useAssetCurrentQueries,
  useAssetHistoryQueries,
} from "@/hooks/useAssetQueries";
import { useAssetStore } from "@/hooks/useAssets";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";

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
      return assets
        .reduce((value, asset, idx) => {
          const pastCoinValue = assetsPast[idx].data.current_price[currency];
          const currentCoinValue =
            assetsCurrent[idx].data.current_price[currency];
          const numCoins =
            asset.value /
            assetsPast[idx].data.current_price[asset.valueCurrency];

          const pastValue = numCoins * pastCoinValue;
          const currentValue = numCoins * currentCoinValue;
          return value + (currentValue - pastValue);
        }, 0)
        .toString();
    }
    return "Loading...";
  })();

  return (
    <p>
      <span className="text-muted-foreground">Portfolio Profit: </span>
      <span className="text-lg">{profit}</span>
    </p>
  );
};

export default CoinOverviewPortfolioProfit;
