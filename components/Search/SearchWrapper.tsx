"use client";

import DropdownProvider from "../Dropdown/DropdownProvider";
import Search from "./Search";

const SearchWrapper = () => {
  return (
    <DropdownProvider>
      <Search />
    </DropdownProvider>
  );
};

export default SearchWrapper;
