"use client";

import { motion } from "framer-motion";
import { useAssetStore } from "@/hooks/useAssetStore";
import { useAssetQueries } from "@/hooks/useAssetQueries";
import { useMarketQuery } from "@/hooks/useMarketQuery";

import { AnimatePresence } from "framer-motion";
import AssetModalWrapper from "./AssetModal/AssetModalWrapper";
import AssetDisplay from "./AssetDisplay";

const Portfolio = () => {
  const assets = useAssetStore().assets;
  const assetResponse = useAssetQueries(assets);
  // const marketResponse = useMarketQuery("usd", "market_cap", "desc");
  // const currentAssetData = assets.map(asset => marketResponse?.data?.pages.)

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
        {assetResponse.map((res, idx) => (
          <AnimatePresence key={assets[idx].assetId}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.02 * idx }}
            >
              <AssetDisplay asset={assets[idx]} response={res} />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
