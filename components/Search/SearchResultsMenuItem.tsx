"use client";

import type { SearchResultWrapper } from "@/utils/types";

import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";
import {
  useClearBarAndMenu,
  useSearchBarActions,
  useSearchBarIsUsingMouse,
  useSearchMenuSelectedIndex,
} from "@/hooks/useSearchBar";

import { HandleNameMatch, HandleSymbolMatch } from "./SearchResultsHelpers";
import Link from "next/link";

type Props = {
  wrapper: SearchResultWrapper;
  idx: number;
};

const SearchResultsMenuItem = ({ wrapper, idx }: Props) => {
  const clearBarAndMenu = useClearBarAndMenu();
  const isUsingMouse = useSearchBarIsUsingMouse();
  const ref = useRef<HTMLDivElement>(null);
  const selectedIndex = useSearchMenuSelectedIndex();

  const { setIsUsingMouse, setMenuSelectedIndex } = useSearchBarActions();

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
        onClick={clearBarAndMenu}
        key={wrapper.result.target + "searchResult"}
        className={cn(
          "indent-3 py-1 block",
          idx === selectedIndex && "bg-zinc-600"
        )}
        onMouseEnter={() => {
          setIsUsingMouse(true);
          setMenuSelectedIndex(idx);
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
