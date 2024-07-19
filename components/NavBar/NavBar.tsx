"use client";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";

import CurrencySelector from "../CurrencySelector/CurrencySelector";
import DropdownProvider from "@/providers/DropdownProvider";
import GlobalData from "./GlobalData";
import NavButtons from "./NavButtons";
import Search from "../Search/Search";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const navSearchId = "navSearch";
  const navCurrencyId = "navCurrency";
  const dropdownKeys = [navSearchId, navCurrencyId];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <div className="mt-4 mb-12">
      <div className="flex justify-end screen-lg:justify-between mb-2">
        <div className="screen-lg:-translate-y-1 fixed bottom-0 screen-lg:bottom-auto ml-6 right-0 screen-lg:right-auto w-full screen-lg:w-auto screen-lg:static screen-lg:block">
          <div className="w-full py-8 screen-lg:py-0 screen-lg:w-[520px] screen-lg:rounded-full border-t dark:border-gray-500/50 border-gray-200/50 h-12 flex justify-center items-center gap-x-1 text-zinc-700 dark:text-default font-medium bg-white dark:bg-white/10 shadow-top shadow-menu-highlight/30">
            <NavButtons />
          </div>
        </div>
        <div className="flex items-start justify-between mx-[2rem] w-full screen-lg:w-auto gap-x-4">
          <DropdownProvider initialUnits={dropdownUnits}>
            {/* dropdownIds are defined in the provider file */}
            <div>
              <Search dropdownId={navSearchId} />
            </div>
            <div className="inline-flex space-x-4">
              <CurrencySelector dropdownId={navCurrencyId} />
              <ThemeToggle />
            </div>
          </DropdownProvider>
        </div>
      </div>
      <GlobalData />
    </div>
  );
};

export default NavBar;
