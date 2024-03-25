"use client";

import { useSearchQueryActions } from "@/hooks/useSearch";

import DropdownMenu from "../Dropdown/DropdownMenu";

type Props = {
  children: React.ReactNode;
};

const SearchResultsMenu = ({ children }: Props) => {
  const { setQuery } = useSearchQueryActions();
  const motionKey = "searchResults";

  return (
    <DropdownMenu
      motionKey={motionKey}
      resetCallback={() => setQuery("")}
      className="w-[320px] max-h-[320px] overflow-y-auto bg-dropdown border border-stone-300 overscroll-contain font-normal rounded-md text-zinc-200 absolute top-[52px] z-10"
    >
      {children}
    </DropdownMenu>
  );
};

export default SearchResultsMenu;
