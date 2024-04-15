"use client";

import { extractDate } from "@/utils/extractDate";
import { sort } from "fast-sort";
import { useAssetStore } from "@/hooks/useAssetStore";
import {
  useAssetCurrentQueries,
  useAssetHistoryQueries,
} from "@/hooks/useAssetQueries";

import AssetModalWrapper from "./AssetModal/AssetModalWrapper";
import AssetDisplay from "./AssetDisplay/AssetDisplay";
import { ErrorBoundary } from "react-error-boundary";

const Portfolio = () => {
  const assets = useAssetStore().assets;
  const sortedAssets = sort(assets).by([
    { asc: (asset) => asset.coinName },
    { asc: (asset) => extractDate(asset.date) },
    { desc: (asset) => asset.value },
  ]);

  const assetHistoryResponse = useAssetHistoryQueries(sortedAssets);
  const assetCurrentResponse = useAssetCurrentQueries(sortedAssets);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[1296px] justify-between items-start">
        <div>
          <h2 className="text-4xl">Your Assets</h2>
        </div>
        <AssetModalWrapper />
      </div>
      {assets.length === 0 && (
        <p className="italic mt-12 text-muted-foreground">No assets found.</p>
      )}
      <div className="flex flex-col gap-y-10 mt-10 mb-[50vh]">
        {sortedAssets.map((asset, idx) => (
          <ErrorBoundary
            key={asset.assetId}
            fallback={<p>Failed to render asset.</p>}
          >
            <AssetDisplay
              asset={asset}
              assetCurrent={assetCurrentResponse[idx].data}
              assetHistory={assetHistoryResponse[idx].data}
            />
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
