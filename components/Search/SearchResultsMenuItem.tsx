"use client";

import type { SearchResultWrapper } from "@/utils/types";

import { cn } from "@/utils/cn";
import { useDropdownStore, useDropdownReset } from "@/hooks/useDropdownStore";

import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import { HandleNameMatch, HandleSymbolMatch } from "./SearchResultsHelpers";
import Link from "next/link";

type Props = {
  wrapper: SearchResultWrapper;
  idx: number;
};

const SearchResultsMenuItem = ({ wrapper, idx }: Props) => {
  const setIsUsingMouse = useDropdownStore((s) => s.setIsUsingMouse);
  const [selectedIndex, setSelectedIndex] = [
    useDropdownStore((s) => s.selectedIndex),
    useDropdownStore((s) => s.setSelectedIndex),
  ];

  const reset = useDropdownReset();

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
