"use client";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";

import CurrencySelector from "../CurrencySelector/CurrencySelector";
import DropdownProvider from "@/providers/DropdownProvider";
import GlobalData from "./GlobalData";
import NavLinks from "../Portfolio/NavLinks";
import Search from "../Search/Search";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const navSearchId = "navSearch";
  const navCurrencyId = "navCurrency";
  const dropdownKeys = [navSearchId, navCurrencyId];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <div className="mt-4 mb-12">
      <div className="flex justify-between mb-2">
        <div className="ml-12 -translate-y-1">
          <NavLinks />
        </div>
        <div className="flex items-start gap-x-4">
          <DropdownProvider initialUnits={dropdownUnits}>
            {/* dropdownIds are defined in the provider file */}
            <Search dropdownId={navSearchId} />
            <CurrencySelector dropdownId={navCurrencyId} />
          </DropdownProvider>
          <div className="mr-12">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <GlobalData />
    </div>
  );
};

export default NavBar;
