"use client";

import { createDropdownStore, DropdownProps } from "@/hooks/useDropdownStore";
import { useState } from "react";

import { DropdownContext } from "@/hooks/useDropdownStore";

type Props = {
  children: React.ReactNode;
  initProps?: DropdownProps;
};

const DropdownProvider = ({ children, initProps }: Props) => {
  const [store] = useState(() => createDropdownStore(initProps));

  return (
    <DropdownContext.Provider value={store}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownProvider;
