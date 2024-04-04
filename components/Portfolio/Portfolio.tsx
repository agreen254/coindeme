"use client";

import AssetModalWrapper from "./AssetModal/AssetModalWrapper";

const Portfolio = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[1296px] justify-between items-start">
        <div>
          <h2 className="text-2xl">Your Assets</h2>
        </div>
        <AssetModalWrapper />
      </div>
      <p className="italic mt-12 text-muted-foreground">
        You currently have no assets.
      </p>
    </div>
  );
};

export default Portfolio;
