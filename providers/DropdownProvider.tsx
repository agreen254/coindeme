"use client";

import { DropdownUnit } from "@/hooks/useDropdownStore";

import { createDropdownStore } from "@/hooks/useDropdownStore";
import { useState } from "react";

import { DropdownContext } from "@/hooks/useDropdownStore";

type Props = {
  children: React.ReactNode;
  initialUnits?: DropdownUnit[];
};

const DropdownProvider = ({ children, initialUnits }: Props) => {
  const [store] = useState(() => createDropdownStore(initialUnits || []));

  return (
    <DropdownContext.Provider value={store}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownProvider;
