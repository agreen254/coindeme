"use client";

import { motion } from "framer-motion";
import { extractDate } from "@/utils/extractDate";
import { sort } from "fast-sort";
import { useAssetStore } from "@/hooks/useAssetStore";
import {
  useAssetCurrentQueries,
  useAssetHistoryQueries,
} from "@/hooks/useAssetQueries";

import { AnimatePresence } from "framer-motion";
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
      {/* <p className="italic mt-12 text-muted-foreground">No assets found.</p> */}
      <div className="flex flex-col gap-y-10 mt-10 mb-[50vh]">
        {sortedAssets.map((asset, idx) => (
          <AnimatePresence key={asset.assetId}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.02 * idx }}
            >
              <ErrorBoundary fallback={<p>Failed to render asset.</p>}>
                <AssetDisplay
                  asset={asset}
                  currentResponse={assetCurrentResponse[idx]}
                  historyResponse={assetHistoryResponse[idx]}
                />
              </ErrorBoundary>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
