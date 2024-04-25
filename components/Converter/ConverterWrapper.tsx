"use client";

import DropdownProvider from "@/providers/DropdownProvider";
import Converter from "./Converter";

import { initializeNewDropdown } from "@/hooks/useDropdownStore";

const ConverterWrapper = () => {
  const dropdownKeys = ["converterFirst", "converterSecond"];
  const dropdownUnits = dropdownKeys.map((key) => initializeNewDropdown(key));

  return (
    <DropdownProvider initialUnits={dropdownUnits}>
      <Converter converterKeys={dropdownKeys} />
    </DropdownProvider>
  );
};

export default ConverterWrapper;
