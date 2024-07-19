"use client";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import DropdownProvider from "@/providers/DropdownProvider";
import Search from "../Search/Search";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import ThemeToggle from "./ThemeToggle";

const NavDropdowns = () => {
  const navSearchId = "navSearch";
  const navCurrencyId = "navCurrency";
  const dropdownKeys = [navSearchId, navCurrencyId];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <DropdownProvider initialUnits={dropdownUnits}>
      <div>
        <Search dropdownId={navSearchId} />
      </div>
      <div className="inline-flex space-x-4">
        <CurrencySelector dropdownId={navCurrencyId} />
        <ThemeToggle />
      </div>
    </DropdownProvider>
  );
};

export default NavDropdowns;
