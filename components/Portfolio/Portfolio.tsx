"use client";

import { useAssetStore } from "@/hooks/useAssetStore";
import { useAssetQueries } from "@/hooks/useAssetQueries";

import AssetModalWrapper from "./AssetModal/AssetModalWrapper";
import AssetDisplay from "./AssetDisplay";

const Portfolio = () => {
  const assets = useAssetStore().assets;
  const response = useAssetQueries(assets);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[1296px] justify-between items-start">
        <div>
          <h2 className="text-2xl">Your Assets</h2>
        </div>
        <AssetModalWrapper />
      </div>
      {/* <p className="italic mt-12 text-muted-foreground">No assets found.</p> */}
      <div className="flex flex-col gap-y-10 mt-10 mb-[50vh]">
        {response.map((res, idx) => (
          <AssetDisplay
            key={assets[idx].assetId}
            asset={assets[idx]}
            response={res}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
