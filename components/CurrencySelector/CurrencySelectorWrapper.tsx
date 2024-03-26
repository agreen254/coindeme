"use client";

import { createDropdownStore } from "@/hooks/useDropdownStore";
import { useState } from "react";

import CurrencySelector from "./CurrencySelector";
import { DropdownContext } from "@/hooks/useDropdownStore";

const CurrencySelectorWrapper = () => {
  const [store] = useState(() => createDropdownStore());

  return (
    <DropdownContext.Provider value={store}>
      <CurrencySelector />
    </DropdownContext.Provider>
  );
};

export default CurrencySelectorWrapper;
