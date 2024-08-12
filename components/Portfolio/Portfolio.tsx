"use client";

import { extractDate } from "@/utils/dateHelpers";
import { sort } from "fast-sort";
import { useAssetStore } from "@/hooks/useAssets";
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
      <div className="flex w-[90vw] screen-xl:w-table-xl justify-between items-start">
        <div>
          <h2 className="text-xl screen-xl:text-4xl screen-lg:text-3xl screen-md:text-2xl">Your Assets</h2>
        </div>
        <AssetModalWrapper role="add" />
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
