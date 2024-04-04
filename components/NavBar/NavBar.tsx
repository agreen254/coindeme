"use client";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";

import CurrencySelector from "../CurrencySelector/CurrencySelector";
import DropdownProvider from "@/providers/DropdownProvider";
import GlobalData from "./GlobalData";
import PortfolioButton from "../Portfolio/PortfolioButton";
import Search from "../Search/Search";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const dropdownKeys = ["navSearch", "navCurrency"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));
  const searchId = dropdownUnits[0].id;
  const currencyId = dropdownUnits[1].id;

  return (
    <div className="mt-4 mb-12">
      <div className="flex justify-between mb-2">
        <div className="ml-12 -translate-y-1">
          <PortfolioButton />
        </div>
        <div className="flex items-start gap-x-4">
          <DropdownProvider initialUnits={dropdownUnits}>
            {/* dropdownIds are defined in the provider file */}
            <Search dropdownId={searchId} />
            <CurrencySelector dropdownId={currencyId} />
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
