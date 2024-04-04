"use client";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";
import { useRef, useState } from "react";

import AssetAddModalActivator from "./AssetAddModalActivator";
import AssetModalBody from "./AssetModalBody";
import DropdownProvider from "@/providers/DropdownProvider";

const AssetModalWrapper = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const activatorRef = useRef<HTMLButtonElement>(null);

  const dropdownKeys = ["portfolioSearch", "portfolioCurrency"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <DropdownProvider initialUnits={dropdownUnits}>
      <AssetAddModalActivator ref={activatorRef} setIsOpen={setModalIsOpen} />
      <AssetModalBody
        ref={activatorRef}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </DropdownProvider>
  );
};

export default AssetModalWrapper;
