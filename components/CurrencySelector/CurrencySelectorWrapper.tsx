"use client";

import CurrencySelector from "./CurrencySelector";
import DropdownProvider from "../Dropdown/DropdownProvider";

const CurrencySelectorWrapper = () => {
  return (
    <DropdownProvider>
      <CurrencySelector />
    </DropdownProvider>
  );
};

export default CurrencySelectorWrapper;
