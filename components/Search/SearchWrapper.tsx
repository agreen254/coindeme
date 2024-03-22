"use client";

import { createDropdownStore } from "@/hooks/useDropdown";
import { useState } from "react";

import { DropdownContext } from "@/hooks/useDropdown";
import Search from "./Search";

const SearchWrapper = () => {
  const [searchDropdownStore] = useState(() =>
    createDropdownStore({ menuSelectedIndex: -1 })
  );

  return (
    <DropdownContext.Provider value={searchDropdownStore}>
      <Search />
    </DropdownContext.Provider>
  );
};

export default SearchWrapper;
