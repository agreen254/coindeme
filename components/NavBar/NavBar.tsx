"use client";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";

import DropdownProvider from "@/providers/DropdownProvider";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
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
    <div className="mt-2 screen-sm:mt-4 mb-4 screen-sm:mb-12">
      <div className="flex justify-end screen-lg:justify-between mb-1 screen-sm:mb-2 max-w-[100vw]">
        <div className="screen-lg:-translate-y-1 fixed bottom-0 screen-lg:bottom-auto ml-6 right-0 screen-lg:right-auto w-full screen-lg:w-auto screen-lg:static screen-lg:block">
          <div className="w-full py-4 screen-sm:py-8 screen-lg:py-0 screen-lg:w-[520px] screen-lg:rounded-full border-y screen-lg:border-b-0 dark:border-gray-500/50 border-gray-400/50 h-12 flex justify-center items-center gap-x-1 text-zinc-700 dark:text-default font-medium bg-white dark:bg-white/10 shadow-top shadow-menu-highlight/30">
            <NavButtons />
          </div>
        </div>
        <div className="flex items-start justify-center screen-sm:justify-between mx-4 screen-lg:mx-8 w-[90vw] screen-lg:w-auto gap-x-4 mb-2">
          <DropdownProvider initialUnits={dropdownUnits}>
            <Search dropdownId={navSearchId} />
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
