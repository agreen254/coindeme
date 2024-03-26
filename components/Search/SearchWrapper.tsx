"use client";

import { createDropdownStore } from "@/hooks/useDropdownStore";
import { useState } from "react";

import { DropdownContext } from "@/hooks/useDropdownStore";
import Search from "./Search";

const SearchWrapper = () => {
  const [searchDropdownStore] = useState(() =>
    createDropdownStore({ selectedIndex: -1 })
  );

  return (
    <DropdownContext.Provider value={searchDropdownStore}>
      <Search />
    </DropdownContext.Provider>
  );
};

export default SearchWrapper;
