"use client";

import { DropdownUnit, initializeNewDropdown } from "@/hooks/useDropdownStore";

import { createDropdownStore } from "@/hooks/useDropdownStore";
import { useState } from "react";

import { DropdownContext } from "@/hooks/useDropdownStore";

const ModalDropdownsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const modalUnits: DropdownUnit[] = [
    initializeNewDropdown("modalSearchDropdown"),
    initializeNewDropdown("modalCurrencyDropdown"),
  ];

  const [store] = useState(() => createDropdownStore(modalUnits));

  return (
    <DropdownContext.Provider value={store}>
      {children}
    </DropdownContext.Provider>
  );
};

export default ModalDropdownsProvider;
