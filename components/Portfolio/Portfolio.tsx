"use client";

import { useState } from "react";

import AddAssetActivator from "./AddAssetModal/AddAssetActivator";
import AddAssetModal from "./AddAssetModal/AddAssetModal";

const Portfolio = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AddAssetActivator open={open} setOpen={setOpen} />
      <AddAssetModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Portfolio;
