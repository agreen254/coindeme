"use client";

import { createDropdownStore } from "@/hooks/useDropdown";
import { useState } from "react";

import CurrencySelector from "./CurrencySelector";
import { DropdownContext } from "@/hooks/useDropdown";

const CurrencySelectorWrapper = () => {
  const [store] = useState(() => createDropdownStore());

  return (
    <DropdownContext.Provider value={store}>
      <CurrencySelector />
    </DropdownContext.Provider>
  );
};

export default CurrencySelectorWrapper;
