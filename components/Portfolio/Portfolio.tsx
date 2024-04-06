"use client";

import { useAssetStore } from "@/hooks/useAssetsStore";
import { useAssetsQuery } from "@/hooks/useAssetsQuery";

import AssetModalWrapper from "./AssetModal/AssetModalWrapper";

const Portfolio = () => {
  const store = useAssetStore();
  const response = useAssetsQuery(store);
  const data = response.flatMap((res) => (res.data ? [res.data] : []));

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[1296px] justify-between items-start">
        <div>
          <h2 className="text-2xl">Your Assets</h2>
        </div>
        <AssetModalWrapper />
      </div>
      <p className="italic mt-12 text-muted-foreground">No assets found.</p>
      {data && data.map((ele) => <p key={ele.assetId}>{ele.name}</p>)}
    </div>
  );
};

export default Portfolio;
