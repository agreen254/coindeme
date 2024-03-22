"use client";

import { createDropdownStore } from "@/hooks/useDropdown";
import { useState } from "react";

import CurrencySelector from "./CurrencySelector";
import { DropdownContext } from "@/hooks/useDropdown";

const CurrencyWrapper = () => {
  const [store] = useState(() =>
    createDropdownStore({ menuSelectedIndex: -1 })
  );

  return (
    <DropdownContext.Provider value={store}>
      <CurrencySelector />
    </DropdownContext.Provider>
  );
};

export default CurrencyWrapper;
