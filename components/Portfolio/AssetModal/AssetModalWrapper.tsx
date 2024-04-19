"use client";

import type { Asset } from "@/utils/types";

import AssetModalAddActivator from "./AssetModalAddActivator";
import AssetModalEditActivator from "./AssetModalEditActivator";
import AssetModalBody from "./AssetModalBody";
import DropdownProvider from "@/providers/DropdownProvider";

import { useRef, useState } from "react";
import { initializeNewDropdown } from "@/hooks/useDropdownStore";

export const currencyDropdownId = "portfolioCurrency";
export const searchDropdownId = "portfolioSearch";

type Props = {
  role: "add" | "edit";
  initialData?: Asset;
};

const AssetModalWrapper = ({ role, initialData }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const activatorRef = useRef<HTMLButtonElement>(null);

  const dropdownKeys = [searchDropdownId, currencyDropdownId];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return role === "add" ? (
    <DropdownProvider initialUnits={dropdownUnits}>
      <AssetModalAddActivator ref={activatorRef} setIsOpen={setModalIsOpen} />
      <AssetModalBody
        ref={activatorRef}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </DropdownProvider>
  ) : (
    <DropdownProvider initialUnits={dropdownUnits}>
      <AssetModalEditActivator
        ref={activatorRef}
        asset={initialData}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />

      <AssetModalBody
        ref={activatorRef}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </DropdownProvider>
  );
};

export default AssetModalWrapper;
