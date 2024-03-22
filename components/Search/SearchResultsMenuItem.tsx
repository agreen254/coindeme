"use client";

import type { SearchResultWrapper } from "@/utils/types";

import { cn } from "@/utils/cn";
import { useDropdownContext, useResetDropdown } from "@/hooks/useDropdown";
import { useEffect, useRef } from "react";

import { HandleNameMatch, HandleSymbolMatch } from "./SearchResultsHelpers";
import Link from "next/link";

type Props = {
  wrapper: SearchResultWrapper;
  idx: number;
};

const SearchResultsMenuItem = ({ wrapper, idx }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isUsingMouse, setIsUsingMouse] = [
    useDropdownContext((s) => s.isUsingMouse),
    useDropdownContext((s) => s.setIsUsingMouse),
  ];
  const [selectedIndex, setSelectedIndex] = [
    useDropdownContext((s) => s.menuSelectedIndex),
    useDropdownContext((s) => s.setMenuSelectedIndex),
  ];

  const resetMenu = useResetDropdown();
  const resetBarAndMenu = () => {
    setIsUsingMouse(false);
    resetMenu();
  };

  // prevent scrolling beyond what the user can see
  // the `isUsingMouse` check is necessary to prevent auto-scrolling if you navigate with the mouse
  useEffect(() => {
    if (idx === selectedIndex && !isUsingMouse) {
      ref.current?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [selectedIndex, isUsingMouse]);

  return (
    <div ref={ref}>
      <Link
        href={`/coin/${wrapper.id}`}
        onClick={resetBarAndMenu}
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
    </div>
  );
};

export default SearchResultsMenuItem;
