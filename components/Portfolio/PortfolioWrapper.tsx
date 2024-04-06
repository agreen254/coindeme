"use client";

import Portfolio from "./Portfolio";
import TanstackPersistProvider from "@/providers/TanstackPersistProvider";

const PortfolioWrapper = () => {
  return (
    <TanstackPersistProvider>
      <Portfolio />
    </TanstackPersistProvider>
  );
};

export default PortfolioWrapper;
