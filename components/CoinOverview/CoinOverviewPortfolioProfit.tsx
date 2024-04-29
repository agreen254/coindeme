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
    assetsPast.every((res) => !!res.data) &&
    assetsCurrent.every((res) => !!res.data);

  const profit = (() => {
    if (hasData) {
      const pastGrossValue = assets
        // user has created the asset with a single currency value, so we must
        // use the ratios between currency values to perform conversions
        .map(
          (asset, idx) =>
            (asset.value * assetsPast[idx].data.current_price[currency]) /
            assetsPast[idx].data.current_price[asset.valueCurrency]
        )
        .reduce((sum, val) => sum + val, 0);

      const currentGrossValue = assetsCurrent
        .map(
          (asset, idx) =>
            (asset.data.current_price[currency] *
              assetsPast[idx].data.current_price[currency]) /
            assetsPast[idx].data.current_price[assets[idx].valueCurrency]
        )
        .reduce((sum, val) => sum + val, 0);

      return currentGrossValue - pastGrossValue;
    }
    return null;
  })();

  return (
    <div>
      <p>{profit !== null && `Net Profit: ${profit}`}</p>
    </div>
  );
};

export default CoinOverviewPortfolioProfit;
