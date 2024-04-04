"use client";

import { DropdownUnit } from "@/hooks/useDropdownStore";

import { createDropdownStore } from "@/hooks/useDropdownStore";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import { useState } from "react";

import { DropdownContext } from "@/hooks/useDropdownStore";

const NavDropdownsProvider = ({ children }: { children: React.ReactNode }) => {
  const modalUnits: DropdownUnit[] = [
    initializeNewDropdown("navSearchDropdown"),
    initializeNewDropdown("navCurrencyDropdown"),
  ];

  const [store] = useState(() => createDropdownStore(modalUnits));
  return (
    <DropdownContext.Provider value={store}>
      {children}
    </DropdownContext.Provider>
  );
};

export default NavDropdownsProvider;
