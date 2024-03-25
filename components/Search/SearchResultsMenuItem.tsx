"use client";

import type { SearchResultWrapper } from "@/utils/types";

import { cn } from "@/utils/cn";
import { useDropdownContext, useResetDropdown } from "@/hooks/useDropdown";

import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import { HandleNameMatch, HandleSymbolMatch } from "./SearchResultsHelpers";
import Link from "next/link";

type Props = {
  wrapper: SearchResultWrapper;
  idx: number;
};

const SearchResultsMenuItem = ({ wrapper, idx }: Props) => {
  const setIsUsingMouse = useDropdownContext((s) => s.setIsUsingMouse);
  const [selectedIndex, setSelectedIndex] = [
    useDropdownContext((s) => s.menuSelectedIndex),
    useDropdownContext((s) => s.setMenuSelectedIndex),
  ];

  const reset = useResetDropdown();

  return (
    <DropdownMenuItem index={idx}>
      <Link
        href={`/coin/${wrapper.id}`}
        onClick={reset}
        key={wrapper.result.target + "searchResult"}
        className={cn(
          "indent-3 py-1 block",
          idx === selectedIndex && "bg-zinc-600"
        )}
        onMouseEnter={() => {
          setIsUsingMouse(true);
          setSelectedIndex(idx);
        }}
      >
        {wrapper.kind === "symbol"
          ? HandleSymbolMatch(wrapper)
          : HandleNameMatch(wrapper)}
      </Link>
    </DropdownMenuItem>
  );
};

export default SearchResultsMenuItem;
